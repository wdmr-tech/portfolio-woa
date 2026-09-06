"use client";

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

import { easeOutExpo } from "@/lib/animations";

/**
 * `template.tsx` se remonta en cada navegación, así que el telón se reproduce
 * como transición de página sin necesidad de congelar el router.
 */
export default function Template({ children }: { children: ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (window.location.hash) return;
    lenis.scrollTo(0, { immediate: true });
  }, [lenis]);

  return (
    <>
      <motion.div
        aria-hidden
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease: easeOutExpo }}
        style={{ originY: 0 }}
        className="bg-ink pointer-events-none fixed inset-0 z-[90]"
      />
      <main className="flex-1">{children}</main>
    </>
  );
}
