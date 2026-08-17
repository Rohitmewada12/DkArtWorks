import { useEffect, useRef } from "react";

/**
 * Adds the "in-view" class to an element the first time it scrolls
 * into the viewport. Used to trigger the hand-drawn line animation
 * and the section fade/rise reveals.
 */
export default function useReveal(options = { threshold: 0.25 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in-view");
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("in-view");
        observer.unobserve(el);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
