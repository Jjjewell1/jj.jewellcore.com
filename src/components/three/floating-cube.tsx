"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";

export function FloatingCube() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = document.createElement("div");
    container.className = "absolute inset-0 pointer-events-none";
    document.body.appendChild(container);

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a2e);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Geometry & Material
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: 0x63b3ed,
      wireframe: true,
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Light
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
    scene.add(light);

    // Animation loop
    let animate = true;
    const clock = new THREE.Clock();

    const animateFn = () => {
      if (!animate) return;
      requestAnimationFrame(animateFn);

      const elapsed = clock.getElapsedTime();
      cube.rotation.y = elapsed * 0.5;
      cube.rotation.x = elapsed * 0.3;

      renderer.render(scene, camera);
    };

    animateFn();

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    setReady(true);

    return () => {
      animate = false;
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(container);
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  if (!ready) return null;

  return <div className="absolute inset-0 pointer-events-none" />;
}