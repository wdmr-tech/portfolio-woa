"use client";

import ProjectCard from "@/components/ProjectCard";
import { MaskText, Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";
import { localizeProject } from "@/content/projects.i18n";
import { useLang } from "@/lib/i18n";

export default function ProjectsGrid() {
  const { lang, t } = useLang();

  return (
    <section id="proyectos" className="py-28 sm:py-40">
      <div className="shell">
        <div className="border-b hairline pb-8">
          <Reveal className="font-mono text-label uppercase opacity-60">
            {t.projects.label}
          </Reveal>
          <MaskText
            as="h2"
            className="text-headline mt-6 font-medium"
            lines={[t.projects.title]}
            delay={0.05}
          />
        </div>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={localizeProject(project, lang)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
