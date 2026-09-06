import type { Transition, Variants } from "framer-motion";

/** Mismo easing que `--ease-out-expo` en globals.css. */
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const viewportOnce = { once: true, amount: 0.35 } as const;

export const baseTransition: Transition = {
  duration: 1,
  ease: easeOutExpo,
};

/** Contenedor que escalona a sus hijos. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

/** Línea de texto que sube desde detrás de una máscara (`.mask-line`). */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 1.1, ease: easeOutExpo },
  },
};

/** Fade + desplazamiento vertical genérico. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: easeOutExpo } },
};

/** Línea que se dibuja de izquierda a derecha. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 1.2, ease: easeOutExpo },
  },
};

/** Telón de las transiciones de página. */
export const curtain: Variants = {
  hidden: { scaleY: 1 },
  show: {
    scaleY: 0,
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};
