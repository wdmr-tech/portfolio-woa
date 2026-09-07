import type { Project } from "@/content/projects";
import type { Lang } from "@/lib/i18n";

/** Campos de un proyecto que dependen del idioma. */
type LocalizableFields = Pick<
  Project,
  "description" | "overview" | "contributions" | "role"
>;

/**
 * Overlay en inglés. Los campos neutros (slug, title, year, engine, studio,
 * cover, gallery, links) se toman del proyecto base en `content/projects.ts`.
 */
const EN: Record<string, LocalizableFields> = {
  foedus: {
    role: "Game Producer & UI Developer",
    description:
      "A dark, secret-laden RPG where you take on the role of a mysterious character.",
    overview: [
      "Foedus is an RPG set in a dark world full of secrets, where you play a mysterious character. The project leans into a somber tone and choice-driven progression, with combat and exploration systems built in Unity.",
      "On production I own the planning, team tracking and per-milestone scoping. In parallel I handle the interface layer: menu architecture, HUD and navigation flows, making sure the UI supports the game's atmosphere instead of competing with it.",
    ],
    contributions: [
      "Milestone planning and production-pipeline tracking.",
      "UI architecture: menus, HUD and navigation flows.",
      "UI implementation in Unity alongside the art and programming teams.",
      "Cross-discipline coordination and scope control.",
    ],
  },
  "project-island": {
    role: "Game Producer & UI Developer",
    description:
      "A narrative point-and-click adventure in isometric view. The investigation of a mysterious island that blends suspense, horror and comedy.",
    overview: [
      "Project Island is a narrative point-and-click adventure in isometric view. The player investigates a mysterious island in a story that blends suspense, horror and comedy, built on dialogue, exploration and puzzle solving.",
      "My role combines production and UI development: I organise the team's work in sprints and build the UI systems in Unreal Engine — inventory, dialogue and interaction feedback — aiming for clear readability without breaking the game's tone.",
    ],
    contributions: [
      "Sprint management, backlog and team communication.",
      "UI design and implementation in Unreal Engine (UMG).",
      "Inventory, dialogue and interaction-feedback systems.",
      "Build tracking and per-milestone QA.",
    ],
  },
};

/** Devuelve el proyecto con los textos del idioma pedido. */
export function localizeProject<T extends Project>(project: T, lang: Lang): T {
  if (lang === "es") return project;
  const overlay = EN[project.slug];
  return overlay ? { ...project, ...overlay } : project;
}
