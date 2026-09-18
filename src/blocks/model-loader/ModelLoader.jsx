import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Loads an external .glb model and makes it float + slowly rotate,
// lit with a colored rim light — same hero-object treatment as the
// floating-icon block, but for a real loaded model.
export default function ModelLoader({
  modelPath,
  scale = 1,
  rimColor = "#4fd1ff",
  bobSpeed = 1,
  bobHeight = 0.15,
}) {
  const groupRef = useRef();
  const { scene } = useGLTF(modelPath);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * bobSpeed) * bobHeight;
    groupRef.current.rotation.y = t * 0.3;
  });

  return (
    <>
      {/* Rim light gives the glossy "product render" edge highlight */}
      <pointLight position={[-3, 2, -2]} intensity={2} color={rimColor} />
      <pointLight position={[3, -1, 2]} intensity={0.6} color="#ffffff" />
      <ambientLight intensity={0.4} />
      <group ref={groupRef} scale={scale}>
        <primitive object={scene} />
      </group>
    </>
  );
}