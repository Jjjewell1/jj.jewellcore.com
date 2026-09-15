"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

interface ServerRoomProps {
  className?: string;
}

interface Blinker {
  material: THREE.MeshBasicMaterial;
  on: THREE.Color;
  speed: number;
  phase: number;
}

export function ServerRoom({ className }: ServerRoomProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x04060d);
    scene.fog = new THREE.Fog(0x04060d, 26, 75);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200);
    camera.position.set(0, 6.5, 23);
    camera.lookAt(0, 3.6, -2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    // Image-based lighting so metal/glass pick up realistic reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new RoomEnvironment();
    const envTex = pmrem.fromScene(envScene, 0.04).texture;
    scene.environment = envTex;

    // ---- Room shell ----
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(140, 90),
      new THREE.MeshStandardMaterial({ color: 0x0b1120, roughness: 0.3, metalness: 0.75 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(140, 70, 0x16c2b5, 0x111a2c);
    grid.position.y = 0.02;
    const gridMat = grid.material as THREE.Material;
    gridMat.transparent = true;
    gridMat.opacity = 0.28;
    scene.add(grid);

    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(140, 90),
      new THREE.MeshStandardMaterial({ color: 0x0d1424, roughness: 0.9, metalness: 0.2 })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 14;
    scene.add(ceiling);

    // ---- Lighting rig ----
    const hemi = new THREE.HemisphereLight(0x9bb8ff, 0x06080f, 1.1);
    scene.add(hemi);

    const key = new THREE.SpotLight(0xd6e6ff, 220, 60, Math.PI / 5, 0.55, 1.4);
    key.position.set(0, 13.5, 0);
    key.target.position.set(0, 0, -2);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.bias = -0.0005;
    scene.add(key, key.target);

    const cyanFill = new THREE.PointLight(0x0bcdd8, 160, 45, 2);
    cyanFill.position.set(-12, 5, 8);
    scene.add(cyanFill);

    const violetFill = new THREE.PointLight(0x8b5cf6, 110, 45, 2);
    violetFill.position.set(12, 4, 10);
    scene.add(violetFill);

    // Ceiling light bars
    const lightBarMat = new THREE.MeshBasicMaterial({ color: 0xcfe8ff });
    for (const [lx, lz] of [
      [-6, -4],
      [0, -4],
      [6, -4],
    ] as const) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.12, 0.7), lightBarMat);
      bar.position.set(lx, 13.6, lz);
      scene.add(bar);
    }

    // ---- Shared materials ----
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x151b29, roughness: 0.45, metalness: 0.85 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x0c1018, roughness: 0.6, metalness: 0.6 });
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x181e2c, roughness: 0.5, metalness: 0.8 });
    const ventMat = new THREE.MeshStandardMaterial({ color: 0x1e2736, roughness: 0.7, metalness: 0.4 });

    const blinkers: Blinker[] = [];

    function createRack(x: number, z: number, rotY: number, height = 9) {
      const rack = new THREE.Group();

      const body = new THREE.Mesh(new THREE.BoxGeometry(2.7, height, 2.4), metalMat);
      body.castShadow = true;
      body.receiveShadow = true;
      rack.add(body);

      const frontPanel = new THREE.Mesh(new THREE.BoxGeometry(2.45, height - 0.6, 0.12), darkMat);
      frontPanel.position.z = 1.2;
      frontPanel.castShadow = true;
      rack.add(frontPanel);

      const units = Math.floor((height - 0.6) / 0.62);
      for (let i = 0; i < units; i++) {
        const y = -height / 2 + 0.62 / 2 + 0.3 + i * 0.62;

        const bezel = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.5, 0.14), bezelMat);
        bezel.position.set(0, y, 1.24);
        bezel.castShadow = true;
        rack.add(bezel);

        for (let s = 0; s < 3; s++) {
          const slat = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.05, 0.02), ventMat);
          slat.position.set(0, y - 0.12 + s * 0.13, 1.32);
          rack.add(slat);
        }

        const ledY = y + 0.16;
        const green = Math.random() > 0.35;
        const led = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 0.1, 0.02),
          new THREE.MeshBasicMaterial({ color: green ? 0x25e37c : 0x25b3ff })
        );
        led.position.set(-0.85, ledY, 1.32);
        rack.add(led);
        if (green) {
          blinkers.push({
            material: led.material as THREE.MeshBasicMaterial,
            on: new THREE.Color(0x25e37c),
            speed: 1.2 + Math.random() * 2.4,
            phase: Math.random() * Math.PI * 2,
          });
        }

        const led2 = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 0.1, 0.02),
          new THREE.MeshBasicMaterial({ color: 0xf59e0b })
        );
        led2.position.set(-0.7, ledY, 1.32);
        rack.add(led2);
        blinkers.push({
          material: led2.material as THREE.MeshBasicMaterial,
          on: new THREE.Color(0xf59e0b),
          speed: 0.8 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
        });
      }

      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(2.3, 0.08, 0.1),
        new THREE.MeshBasicMaterial({ color: 0x67e8f9 })
      );
      strip.position.set(0, height / 2 + 0.04, 1.24);
      rack.add(strip);

      rack.position.set(x, 0, z);
      rack.rotation.y = rotY;
      scene.add(rack);
    }

    createRack(-8.5, -3, 0.2);
    createRack(0, -6, 0);
    createRack(8.5, -3, -0.2);
    createRack(-6.5, 5, 0.5);
    createRack(6.5, 5, -0.5);
    createRack(-3.2, 8, 0.15, 5);
    createRack(3.2, 8, -0.15, 5);

    // ---- Cable tray + sagging cables ----
    const trayMat = new THREE.MeshStandardMaterial({ color: 0x20293b, roughness: 0.6, metalness: 0.7 });
    const tray = new THREE.Mesh(new THREE.BoxGeometry(30, 0.25, 2), trayMat);
    tray.position.set(0, 10.5, -2);
    tray.castShadow = true;
    scene.add(tray);

    const cableMat = new THREE.MeshStandardMaterial({ color: 0x10151f, roughness: 0.55, metalness: 0.4 });
    const cableSpots = [
      { x: -6, z: -1, rackY: 4 },
      { x: -3, z: -3, rackY: 2.5 },
      { x: 0, z: -2, rackY: 3.5 },
      { x: 3, z: -3, rackY: 2.5 },
      { x: 6, z: -1, rackY: 4 },
    ];
    for (const c of cableSpots) {
      const midY = (10.4 + c.rackY) / 2 - 1.4;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(c.x, 10.4, c.z),
        new THREE.Vector3(c.x, midY, c.z),
        new THREE.Vector3(c.x, c.rackY, 1.24),
      ]);
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.06, 8, false), cableMat);
      tube.castShadow = true;
      scene.add(tube);
    }

    // ---- Floating dust ----
    const dustCount = 350;
    const positions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x66ccff,
      size: 0.06,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ---- Animation ----
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouse);

    let raf = 0;
    let running = true;
    const clock = new THREE.Clock();

    const render = () => {
      if (!running) return;
      raf = requestAnimationFrame(render);
      const t = clock.getElapsedTime();

      mouse.x += (target.x - mouse.x) * 0.04;
      mouse.y += (target.y - mouse.y) * 0.04;

      const ang = t * 0.045 + mouse.x * 0.45;
      camera.position.x = Math.sin(ang) * 23;
      camera.position.z = Math.cos(ang) * 23;
      camera.position.y = 6.5 + mouse.y * 1.6;
      camera.lookAt(0, 3.6, -2);

      for (const b of blinkers) {
        const v = (Math.sin(t * b.speed + b.phase) + 1) / 2;
        b.material.color.copy(b.on).multiplyScalar(0.12 + v * 0.88);
      }

      dust.rotation.y = t * 0.02;
      dust.position.y = Math.sin(t * 0.15) * 0.4;

      renderer.render(scene, camera);
    };
    render();

    const onResize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      envTex.dispose();
      envScene.dispose?.();
      pmrem.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          for (const m of mats) m.dispose();
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={className ?? "absolute inset-0 pointer-events-none"} />;
}