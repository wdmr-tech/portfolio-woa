"use client";

import { motion } from "framer-motion";

/** Cinta infinita. Duplica el contenido para que el loop no tenga costura. */
export default function Marquee({
  items,
  duration = 26,
  className = "",
}: {
  items: string[];
  duration?: number;
  className?: string;
}) {
  const track = [...items, ...items];

  return (
    <div className={`relative overflow-hidden select-none ${className}`} aria-hidden>
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-8 pr-8 text-[clamp(2rem,6vw,5rem)] font-medium tracking-tight whitespace-nowrap"
          >
            {item}
            <span className="inline-block h-2 w-2 rounded-full bg-current opacity-40" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
