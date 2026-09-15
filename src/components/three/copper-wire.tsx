"use client";

import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
const { Vector2 } = THREE;

export function CopperWire() {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const torusRef = useRef<THREE.Mesh | null>(null);
  const wireRef = useRef<THREE.Mesh | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const raycasterRef = useRef<THREE.Raycaster | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 8, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    document.getElementById("copper-wire-canvas")!.appendChild(renderer.domElement);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambientLight);

    // Directional light - copper glow
    const dirLight = new THREE.DirectionalLight(0xffa500, 0.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Point light for copper emission
    const pointLight = new THREE.PointLight(0xffa500, 0.4, 20);
    pointLight.position.set(0, 2, 0);
    scene.add(pointLight);

    // Copper wire coil (thin torus knots)
    const coilGeometry = new THREE.TorusGeometry(2, 0.15, 16, 64);
    const coilMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xb87333,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.4,
      thickness: 1.5,
      ior: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
    });
    const coil = new THREE.Mesh(coilGeometry, coilMaterial);
    coil.position.z = -3;
    coil.rotation.x = Math.PI / 4;
    scene.add(coil);

    // Inner copper wire - helix
    const wireGeometry = new THREE.CylinderGeometry(0.08, 0.08, 15, 12);
    const wireMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff8c00,
      metalness: 0.95,
      roughness: 0.05,
      emissive: 0xffa500,
      emissiveIntensity: 0.3,
      transmission: 0.6,
      thickness: 1.0,
      ior: 1.5,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    wire.position.y = -4;
    wire.rotation.x = Math.PI / 2;
    scene.add(wire);

    // Wire coil around the torus
    const wireCoilGeometry = new THREE.TorusKnotGeometry(2.2, 0.12, 100, 20);
    const wireCoilMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff6b35,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0xff6b35,
      emissiveIntensity: 0.2,
      transmission: 0.5,
      thickness: 0.8,
    });
    const wireCoil = new THREE.Mesh(wireCoilGeometry, wireCoilMaterial);
    wireCoil.position.z = 3;
    scene.add(wireCoil);

    // Stats/orb floating in center
    const orbGeometry = new THREE.SphereGeometry(1, 32, 32);
    const orbMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00d4ff,
      metalness: 0.5,
      roughness: 0.3,
      transmission: 0.8,
      thickness: 1.0,
      ior: 1.3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orb.position.set(0, 1, 0);
    scene.add(orb);

    // Add twinkling stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 300;
    const starVertices = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      const radius = 50 + Math.random() * 100;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starVertices[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starVertices[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starVertices[i * 3 + 2] = radius * Math.cos(phi);
      starSizes[i] = 0.5 + Math.random() * 1.5;
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.8,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    window.addEventListener("mousemove", (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (wireCoil) {
        wireCoil.rotation.y += 0.005;
        wireCoil.rotation.x += 0.002;
      }
      if (coil) {
        coil.rotation.y += 0.003;
      }
      if (wire) {
        wire.rotation.y += 0.01;
      }
      if (orb) {
        orb.rotation.y += 0.005;
      }
      if (raycaster && mouseRef.current) {
        const mouse = new Vector2(mouseRef.current.x, mouseRef.current.y);
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([coil, wire, wireCoil]);
        if (intersects.length > 0) {
          const intersect = intersects[0];
          wireMaterial.emissiveIntensity = 0.5;
          coilMaterial.emissiveIntensity = 0.3;
        } else {
          wireMaterial.emissiveIntensity = 0.3;
          coilMaterial.emissiveIntensity = 0.1;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Store references
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    torusRef.current = coil;
    wireRef.current = wire;
    raycasterRef.current = raycaster;

    return () => {
      document.getElementById("copper-wire-canvas")!.remove();
      renderer.dispose();
      renderer.forceContextLoss();
      window.removeEventListener("mousemove", (e) => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      });
      window.removeEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    };
  }, []);

  return (
    <div id="copper-wire-canvas" style={{ width: "100%", height: "400px" }} />
  );
}