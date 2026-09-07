"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  type PanInfo,
} from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import ProjectCover from "@/components/ProjectCover";
import { Reveal } from "@/components/Reveal";
import { easeOutExpo } from "@/lib/animations";

type GalleryProps = {
  images: string[];
  title: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function Gallery({ images, title }: GalleryProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const nav = useCallback(
    (delta: number) =>
      setActive((current) => (current + delta + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") nav(1);
      if (event.key === "ArrowLeft") nav(-1);
    };

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, nav]);

  return (
    <>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {images.map((image, index) => (
          <Reveal key={image} delay={(index % 2) * 0.08}>
            <GalleryThumb
              src={image}
              title={title}
              alt={`${title} — imagen ${index + 1}`}
              index={index}
              total={images.length}
              onOpen={() => {
                setActive(index);
                setOpen(true);
              }}
            />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <Lightbox
            images={images}
            active={active}
            title={title}
            onClose={close}
            onNav={nav}
            onJump={setActive}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Miniatura con parallax al puntero ─────────────────────────── */

function GalleryThumb({
  src,
  alt,
  title,
  index,
  total,
  onOpen,
}: {
  src: string;
  alt: string;
  title: string;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 140, damping: 18, mass: 0.4 });

  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width - 0.5) * 18);
    my.set(((event.clientY - rect.top) / rect.height - 0.5) * 18);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-cursor
      data-cursor-label="Ampliar"
      className="group relative block aspect-4/3 w-full overflow-hidden bg-ink"
    >
      <motion.div
        className="absolute inset-[-7%]"
        style={{ x, y }}
        initial={false}
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 1.1, ease: easeOutExpo }}
      >
        <ProjectCover src={src} alt={alt} title={title} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 sm:p-6">
        <div className="glass flex w-full items-center justify-between rounded-full px-5 py-3 font-mono text-label text-ink uppercase">
          <span>
            {pad(index + 1)} / {pad(total)}
          </span>
          <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
            Ampliar ↗
          </span>
        </div>
      </div>
    </button>
  );
}

/* ── Visor a pantalla completa ─────────────────────────────────── */

function Lightbox({
  images,
  active,
  title,
  onClose,
  onNav,
  onJump,
}: {
  images: string[];
  active: number;
  title: string;
  onClose: () => void;
  onNav: (delta: number) => void;
  onJump: (index: number) => void;
}) {
  const src = images[active];

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) onNav(1);
    else if (info.offset.x > 80) onNav(-1);
  };

  return (
    <motion.div
      className="invert-section fixed inset-0 z-[90] flex flex-col bg-[color-mix(in_srgb,var(--color-ink)_94%,transparent)] backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: easeOutExpo }}
      onClick={onClose}
    >
      <div
        className="shell flex items-center justify-between gap-6 py-6 font-mono text-label text-paper/70 uppercase"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="truncate">{title} — galería</span>
        <span className="shrink-0">
          {pad(active + 1)} / {pad(images.length)}
        </span>
        <button
          type="button"
          onClick={onClose}
          data-cursor
          className="shrink-0 uppercase opacity-70 transition-opacity duration-300 hover:opacity-100"
        >
          Cerrar ✕
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-10 sm:px-24"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onNav(-1)}
          data-cursor
          aria-label="Imagen anterior"
          className="absolute top-1/2 left-1 z-10 -translate-y-1/2 p-4 text-3xl text-paper/60 transition-all duration-300 hover:-translate-x-1 hover:text-paper sm:left-6"
        >
          ←
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={src}
            className="relative h-full w-full cursor-grab active:cursor-grabbing"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={handleDragEnd}
          >
            <Image
              src={src}
              alt={`${title} — imagen ${active + 1}`}
              fill
              sizes="100vw"
              priority
              draggable={false}
              className="object-contain select-none"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => onNav(1)}
          data-cursor
          aria-label="Imagen siguiente"
          className="absolute top-1/2 right-1 z-10 -translate-y-1/2 p-4 text-3xl text-paper/60 transition-all duration-300 hover:translate-x-1 hover:text-paper sm:right-6"
        >
          →
        </button>
      </div>

      <div
        className="shell flex flex-wrap justify-center gap-2 pb-8"
        onClick={(event) => event.stopPropagation()}
      >
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => onJump(index)}
            data-cursor
            aria-label={`Ir a la imagen ${index + 1}`}
            className={`relative h-12 w-[4.5rem] overflow-hidden transition-opacity duration-300 ${
              index === active
                ? "opacity-100 ring-1 ring-paper"
                : "opacity-40 hover:opacity-75"
            }`}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="72px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
}
