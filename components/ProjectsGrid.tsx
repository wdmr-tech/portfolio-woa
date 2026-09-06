import ProjectCard from "@/components/ProjectCard";
import { MaskText, Reveal } from "@/components/Reveal";
import { projects } from "@/content/projects";

export default function ProjectsGrid() {
  return (
    <section id="proyectos" className="py-28 sm:py-40">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b hairline pb-8">
          <div>
            <Reveal className="font-mono text-label uppercase opacity-60">
              02 — Proyectos
            </Reveal>
            <MaskText
              as="h2"
              className="text-headline mt-6 font-medium"
              lines={["Trabajo"]}
              delay={0.05}
            />
          </div>
          <Reveal
            as="p"
            className="max-w-xs font-mono text-label uppercase opacity-60"
            delay={0.15}
          >
            {String(projects.length).padStart(2, "0")} proyectos seleccionados ·
            Red Wine Interactive
          </Reveal>
        </div>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-x-10 md:gap-y-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
