"use client";

import Link from "next/link";

import Gallery from "@/components/Gallery";
import ProjectCover from "@/components/ProjectCover";
import { MaskText, Reveal, RevealGroup } from "@/components/Reveal";
import type { Project } from "@/content/projects";
import { localizeProject } from "@/content/projects.i18n";
import { useLang } from "@/lib/i18n";

type Props = {
  project: Project;
  number: string;
  next: { slug: string; title: string };
};

export default function ProjectView({ project, number, next }: Props) {
  const { lang, t } = useLang();
  const p = localizeProject(project, lang);

  const meta = [
    { label: t.project.meta.year, value: p.year },
    { label: t.project.meta.engine, value: p.engine },
    { label: t.project.meta.role, value: p.role },
    { label: t.project.meta.studio, value: p.studio },
  ];

  return (
    <article>
      <header className="shell pt-36 pb-16 sm:pt-48 sm:pb-24">
        <Reveal className="font-mono text-label uppercase opacity-60">
          {number} — {t.project.word}
        </Reveal>

        <MaskText
          as="h1"
          className="text-display mt-8 font-medium"
          lines={[p.title]}
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
            src={p.cover}
            alt={`${p.title} — ${t.project.word}`}
            title={p.title}
            sizes="100vw"
            priority
          />
        </div>
      </Reveal>

      <section className="invert-section bg-ink text-paper mt-24 py-24 sm:mt-32 sm:py-32">
        <div className="shell grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal className="font-mono text-label uppercase opacity-60">
              {t.project.about}
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <RevealGroup className="flex flex-col gap-7" step={0.12}>
              {(p.overview ?? [p.description]).map((paragraph, paragraphIndex) => (
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
              ))}
            </RevealGroup>

            {p.contributions && p.contributions.length > 0 && (
              <div className="mt-16">
                <Reveal className="font-mono text-label uppercase opacity-60">
                  {t.project.contribution}
                </Reveal>
                <RevealGroup as="ul" className="mt-6 flex flex-col" step={0.07}>
                  {p.contributions.map((item) => (
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

            {p.links && p.links.length > 0 && (
              <RevealGroup className="mt-12 flex flex-wrap gap-4" step={0.08}>
                {p.links.map((link) => (
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

      {p.gallery.length > 0 && (
        <section className="shell py-24 sm:py-32">
          <Reveal className="font-mono text-label uppercase opacity-60">
            {t.project.gallery}
          </Reveal>
          <Gallery images={p.gallery} title={p.title} />
        </section>
      )}

      <section className="shell py-24 sm:py-32">
        <Link
          href={`/proyectos/${next.slug}`}
          data-cursor
          data-cursor-label={t.card.viewLabel}
          className="group block border-t hairline pt-10"
        >
          <p className="font-mono text-label uppercase opacity-60">
            {t.project.next}
          </p>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-6">
            <h2 className="text-headline font-medium">{next.title}</h2>
            <span
              aria-hidden
              className="text-4xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3"
            >
              →
            </span>
          </div>
        </Link>
      </section>
    </article>
  );
}
