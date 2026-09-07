import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import ProjectCover from "@/components/ProjectCover";
import { MaskText, Reveal, RevealGroup } from "@/components/Reveal";
import { getAdjacentProject, getProject, projects } from "@/content/projects";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.description,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/proyectos/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const number = String(index + 1).padStart(2, "0");
  const next = getAdjacentProject(project.slug);

  const meta = [
    { label: "Año", value: project.year },
    { label: "Engine", value: project.engine },
    { label: "Rol", value: project.role },
    { label: "Estudio", value: project.studio },
  ];

  return (
    <>
      <article>
        <header className="shell pt-36 pb-16 sm:pt-48 sm:pb-24">
          <Reveal className="font-mono text-label uppercase opacity-60">
            {number} — Proyecto
          </Reveal>

          <MaskText
            as="h1"
            className="text-display mt-8 font-medium"
            lines={[project.title]}
            delay={0.05}
          />

          <RevealGroup
            className="mt-16 grid gap-px border-t hairline sm:grid-cols-2 lg:grid-cols-4"
            step={0.08}
          >
            {meta.map((item) => (
              <Reveal key={item.label} className="pt-6 sm:pr-8">
                <p className="font-mono text-label uppercase opacity-50">
                  {item.label}
                </p>
                <p className="mt-2 text-lg tracking-tight sm:text-xl">
                  {item.value}
                </p>
              </Reveal>
            ))}
          </RevealGroup>
        </header>

        <Reveal className="shell">
          <div className="relative aspect-16/9 w-full overflow-hidden bg-ink">
            <ProjectCover
              src={project.cover}
              alt={`Portada de ${project.title}`}
              title={project.title}
              sizes="100vw"
              priority
            />
          </div>
        </Reveal>

        <section className="invert-section bg-ink text-paper mt-24 py-24 sm:mt-32 sm:py-32">
          <div className="shell grid gap-14 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal className="font-mono text-label uppercase opacity-60">
                Sobre el proyecto
              </Reveal>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <RevealGroup className="flex flex-col gap-7" step={0.12}>
                {(project.overview ?? [project.description]).map(
                  (paragraph, paragraphIndex) => (
                    <Reveal
                      as="p"
                      key={paragraphIndex}
                      className={
                        paragraphIndex === 0
                          ? "text-lede"
                          : "text-base leading-relaxed opacity-70 sm:text-lg"
                      }
                    >
                      {paragraph}
                    </Reveal>
                  )
                )}
              </RevealGroup>

              {project.contributions && project.contributions.length > 0 && (
                <div className="mt-16">
                  <Reveal className="font-mono text-label uppercase opacity-60">
                    Mi aporte
                  </Reveal>
                  <RevealGroup as="ul" className="mt-6 flex flex-col" step={0.07}>
                    {project.contributions.map((item) => (
                      <Reveal
                        as="li"
                        key={item}
                        className="border-b hairline py-4 text-lg tracking-tight sm:text-xl"
                      >
                        {item}
                      </Reveal>
                    ))}
                  </RevealGroup>
                </div>
              )}

              {project.links && project.links.length > 0 && (
                <RevealGroup className="mt-12 flex flex-wrap gap-4" step={0.08}>
                  {project.links.map((link) => (
                    <Reveal key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        data-cursor
                        className="inline-flex items-center gap-2 rounded-full border hairline px-5 py-3 font-mono text-label uppercase transition-colors duration-500 hover:bg-paper hover:text-ink"
                      >
                        {link.label} ↗
                      </a>
                    </Reveal>
                  ))}
                </RevealGroup>
              )}
            </div>
          </div>
        </section>

        {project.gallery.length > 0 && (
          <section className="shell py-24 sm:py-32">
            <Reveal className="font-mono text-label uppercase opacity-60">
              Galería
            </Reveal>
            <Gallery images={project.gallery} title={project.title} />
          </section>
        )}

        <NextProject slug={next.slug} title={next.title} />
      </article>

      <Footer />
    </>
  );
}

function NextProject({ slug, title }: { slug: string; title: string }) {
  return (
    <section className="shell py-24 sm:py-32">
      <Link
        href={`/proyectos/${slug}`}
        data-cursor
        data-cursor-label="Ver"
        className="group block border-t hairline pt-10"
      >
        <p className="font-mono text-label uppercase opacity-60">
          Siguiente proyecto
        </p>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-6">
          <h2 className="text-headline font-medium">{title}</h2>
          <span
            aria-hidden
            className="text-4xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3"
          >
            →
          </span>
        </div>
      </Link>
    </section>
  );
}
