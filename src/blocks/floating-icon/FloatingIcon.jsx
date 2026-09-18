import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Wraps any 3D object (children) and makes it float + slowly rotate,
// with a colored rim light for that "glossy mascot" look.
export default function FloatingIcon({
  rimColor = "#4fd1ff",
  bobSpeed = 1,
  bobHeight = 0.15,
  children,
}) {
  const groupRef = useRef();

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
      <group ref={groupRef}>{children}</group>
    </>
  );
}
