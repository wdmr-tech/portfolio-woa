"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE = 'a, button, [role="button"], [data-cursor]';

/**
 * Cursor propio: círculo con `mix-blend-mode: difference` que crece sobre
 * elementos interactivos. No se monta en dispositivos táctiles.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 620, damping: 42, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 620, damping: 42, mass: 0.45 });

  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest?.(INTERACTIVE);
      setHovering(Boolean(target));
      setLabel(target?.getAttribute("data-cursor-label") ?? null);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    window.addEventListener("blur", onLeave);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = label ? 104 : hovering ? 62 : 14;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-white"
        animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      >
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[10px] tracking-[0.16em] text-black uppercase"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
