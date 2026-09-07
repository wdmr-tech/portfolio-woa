export type Project = {
  slug: string;
  title: string;
  year: string;
  engine: string;
  role: string;
  studio: string;
  description: string;
  cover: string;
  gallery: string[];
  /** Párrafos largos para la subpágina del proyecto. */
  overview?: string[];
  /** Bullets de aporte concreto, mostrados en la subpágina. */
  contributions?: string[];
  /** Enlaces externos (Steam, itch, prensa, trailer…). */
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "foedus",
    title: "Foedus",
    year: "2026",
    engine: "Unity",
    role: "Game Producer & UI Developer",
    studio: "Red Wine Interactive",
    description:
      "RPG ambientado en un mundo oscuro y lleno de secretos, donde tomas el rol de un personaje misterioso.",
    cover: "/images/projects/foedus/cover.webp",
    gallery: [
      "/images/projects/foedus/foedus_01.webp",
      "/images/projects/foedus/foedus_02.webp",
      "/images/projects/foedus/foedus_03.webp",
      "/images/projects/foedus/foedus_04.webp",
    ],
    overview: [
      "Foedus es un RPG ambientado en un mundo oscuro y lleno de secretos, donde tomas el rol de un personaje misterioso. El proyecto explora un tono sombrío y una progresión guiada por decisiones, con sistemas de combate y exploración construidos en Unity.",
      "Desde producción llevo la planificación, el seguimiento del equipo y la definición del alcance por milestone. En paralelo trabajo la capa de interfaz: arquitectura de menús, HUD y flujos de navegación, cuidando que la UI sostenga la atmósfera del juego en vez de competir con ella.",
    ],
    contributions: [
      "Planificación de milestones y seguimiento del pipeline de producción.",
      "Arquitectura de UI: menús, HUD y flujos de navegación.",
      "Implementación de interfaz en Unity junto al equipo de arte y programación.",
      "Coordinación entre disciplinas y control de alcance.",
    ],
    links: [],
  },
  {
    slug: "project-island",
    title: "Project Island",
    year: "2025–2026",
    engine: "Unreal Engine",
    role: "Game Producer & UI Developer",
    studio: "Red Wine Interactive",
    description:
      "Aventura gráfica narrativa en vista isométrica. Investigación de una misteriosa isla que fusiona suspenso, horror y comedia.",
    cover: "/images/projects/project-island/cover.webp",
    gallery: [
      "/images/projects/project-island/island_01.webp",
      "/images/projects/project-island/island_02.webp",
      "/images/projects/project-island/island_03.webp",
      "/images/projects/project-island/island_04.webp",
    ],
    overview: [
      "Project Island es una aventura gráfica narrativa en vista isométrica. El jugador investiga una misteriosa isla en una historia que fusiona suspenso, horror y comedia, apoyándose en diálogo, exploración y resolución de puzzles.",
      "Mi rol combina producción y desarrollo de interfaz: organizo el trabajo del equipo por sprints y construyo los sistemas de UI en Unreal Engine — inventario, diálogos y feedback de interacción — buscando que la lectura sea clara sin romper el tono del juego.",
    ],
    contributions: [
      "Gestión de sprints, backlog y comunicación del equipo.",
      "Diseño e implementación de UI en Unreal Engine (UMG).",
      "Sistemas de inventario, diálogo y feedback de interacción.",
      "Seguimiento de build y control de calidad por milestone.",
    ],
    links: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
