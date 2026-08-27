"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const yA = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const yC = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const springA = useSpring(yA, { stiffness: 40, damping: 30 });
  const springB = useSpring(yB, { stiffness: 50, damping: 30 });
  const springC = useSpring(yC, { stiffness: 35, damping: 30 });

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y: springA, x: mouse.x * 0.4 }}
        className="aurora-blob aurora-blob-1"
      />
      <motion.div
        style={{ y: springB, x: -mouse.x * 0.3 }}
        className="aurora-blob aurora-blob-2"
      />
      <motion.div
        style={{ y: springC, x: mouse.x * 0.2 }}
        className="aurora-blob aurora-blob-3"
      />
      <motion.div
        style={{ x: mouse.y * 0.25 }}
        className="aurora-blob aurora-blob-4"
      />

      <div className="bg-grid" />
      <div className="bg-noise" />
      <div className="bg-vignette" />
    </div>
  );
}
