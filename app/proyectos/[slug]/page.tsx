import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import ProjectView from "@/components/ProjectView";
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

  return (
    <>
      <ProjectView
        project={project}
        number={number}
        next={{ slug: next.slug, title: next.title }}
      />
      <Footer />
    </>
  );
}
