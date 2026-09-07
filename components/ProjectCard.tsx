"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import ProjectCover from "@/components/ProjectCover";
import { easeOutExpo, viewportOnce } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import type { Project } from "@/content/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { t } = useLang();
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 1, ease: easeOutExpo, delay: index * 0.08 }}
      className={index % 2 === 1 ? "md:mt-28" : undefined}
    >
      <Link
        href={`/proyectos/${project.slug}`}
        data-cursor
        data-cursor-label={t.card.viewLabel}
        className="group block"
      >
        <div className="relative aspect-4/3 w-full overflow-hidden bg-ink">
          <motion.div
            className="absolute inset-0"
            initial={false}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.1, ease: easeOutExpo }}
          >
            <ProjectCover
              src={project.cover}
              alt={`Portada de ${project.title}`}
              title={project.title}
              priority={index === 0}
            />
          </motion.div>

          {/* Overlay glass, sólo en hover y en punteros finos */}
          <div className="pointer-events-none absolute inset-0 flex items-end p-5 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 sm:p-7">
            <div className="glass flex w-full items-center justify-between rounded-full px-5 py-3 font-mono text-label text-ink uppercase">
              <span>{project.engine}</span>
              <span className="translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                {t.card.view} →
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t hairline pt-5">
          <h3 className="text-3xl font-medium tracking-tight sm:text-4xl">
            <span className="font-mono text-label align-super opacity-40">
              {number}
            </span>{" "}
            {project.title}
          </h3>
          <p className="font-mono text-label uppercase opacity-60">
            {project.year} · {project.engine}
          </p>
        </div>

        <p className="mt-4 max-w-xl text-base leading-relaxed opacity-70">
          {project.description}
        </p>

        <p className="mt-3 font-mono text-label uppercase opacity-40">
          {project.role}
        </p>
      </Link>
    </motion.article>
  );
}
