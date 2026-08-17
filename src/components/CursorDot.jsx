import { useEffect, useRef } from "react";

/**
 * A small gold ring that trails the cursor with light easing, and grows
 * over anything tagged data-cursor="hover" (links, buttons, cards).
 * Disabled entirely on touch devices and when reduced motion is set.
 */
export default function CursorDot() {
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduced) return;

    const el = dotRef.current;
    if (!el) return;

    function onMove(e) {
      target.current = { x: e.clientX, y: e.clientY };
      el.classList.add("visible");
      const hit = e.target.closest('[data-cursor="hover"]');
      el.classList.toggle("active", Boolean(hit));
    }

    function onLeave() {
      el.classList.remove("visible");
    }

    function loop() {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      raf.current = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
