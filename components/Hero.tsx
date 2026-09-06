"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { easeOutExpo, maskUp, stagger } from "@/lib/animations";
import { site } from "@/lib/site";

const NAME_LINES = ["Wladimir", "Acevedo"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden pt-28 pb-8 sm:pt-32"
    >
      <motion.div style={{ y, opacity }} className="shell flex flex-1 flex-col justify-between">
        <motion.div
          variants={stagger(0.1, 0.15)}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-16"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 font-mono text-label uppercase">
            <span className="mask-line">
              <motion.span variants={maskUp} className="block">
                Portafolio — {site.role}
              </motion.span>
            </span>
            <span className="mask-line">
              <motion.span variants={maskUp} className="block">
                {site.studio} · {site.location}
              </motion.span>
            </span>
          </div>

          <h1 className="text-display font-medium">
            {NAME_LINES.map((line) => (
              <span className="mask-line" key={line}>
                <motion.span variants={maskUp} className="block">
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOutExpo, delay: 0.9 }}
            className="text-lede max-w-xl md:col-span-6 md:col-start-1"
          >
            Produzco videojuegos y construyo las interfaces con las que se juegan.
            Unity, Unreal Engine y equipos que necesitan orden para llegar a la
            build.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: easeOutExpo, delay: 1.15 }}
            className="flex items-end justify-between gap-6 font-mono text-label uppercase md:col-span-4 md:col-start-9"
          >
            <a
              href="#proyectos"
              data-cursor
              className="group inline-flex items-center gap-3"
            >
              <span>Ver proyectos</span>
              <span aria-hidden className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-1">
                ↓
              </span>
            </a>
            <span className="hidden sm:inline">2026</span>
          </motion.div>
        </div>
      </motion.div>

      <ScrollHint />
    </section>
  );
}

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.4 }}
      className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      aria-hidden
    >
      <motion.span
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="h-10 w-px bg-current opacity-30"
      />
    </motion.div>
  );
}
