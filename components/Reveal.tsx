"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

import { fadeUp, maskUp, stagger, viewportOnce } from "@/lib/animations";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variants?: Variants;
};

/** Fade + subida al entrar en viewport, una sola vez. */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  variants = fadeUp,
}: RevealProps) {
  const Component = motion[as as "div"] ?? motion.div;

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

/** Contenedor que escalona a hijos que declaren `hidden`/`show`. */
export function RevealGroup({
  children,
  className,
  as = "div",
  step = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  step?: number;
  delay?: number;
}) {
  const Component = motion[as as "div"] ?? motion.div;

  return (
    <Component
      className={className}
      variants={stagger(step, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </Component>
  );
}

/**
 * Titular revelado línea a línea desde detrás de una máscara.
 * Cada string de `lines` es una línea; el salto es manual y a propósito.
 */
export function MaskText({
  lines,
  className,
  as: Component = "h2",
  step = 0.09,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  as?: ElementType;
  step?: number;
  delay?: number;
}) {
  return (
    <Component className={className}>
      <motion.span
        className="block"
        variants={stagger(step, delay)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
      >
        {lines.map((line, index) => (
          <span className="mask-line" key={`${line}-${index}`}>
            <motion.span className="block" variants={maskUp}>
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
