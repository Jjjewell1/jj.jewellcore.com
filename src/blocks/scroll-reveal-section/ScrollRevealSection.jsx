import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OFFSETS = {
  up: { y: 60, x: 0 },
  left: { y: 0, x: -60 },
  right: { y: 0, x: 60 },
};

export default function ScrollRevealSection({
  direction = "up",
  delay = 0,
  children,
}) {
  const sectionRef = useRef();

  useEffect(() => {
    const el = sectionRef.current;
    const offset = OFFSETS[direction] ?? OFFSETS.up;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: offset.x, y: offset.y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [direction, delay]);

  return <section ref={sectionRef}>{children}</section>;
}
