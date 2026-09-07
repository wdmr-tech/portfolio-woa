/**
 * Copys de interfaz en los dos idiomas del sitio. El contenido de cada proyecto
 * vive en `content/projects.i18n.ts`.
 */

export type Dict = {
  nav: {
    bio: string;
    projects: string;
    contact: string;
    back: string;
  };
  langSwitch: { label: string; es: string; en: string };
  hero: {
    kicker: string;
    lede: string;
    cta: string;
  };
  bio: {
    label: string;
    title: [string, string];
    lede: string;
    capabilities: { title: string; items: string[] }[];
  };
  projects: {
    label: string;
    title: string;
  };
  card: {
    view: string;
    viewLabel: string;
  };
  footer: {
    label: string;
    emailLabel: string;
    linksLabel: string;
    linkedin: string;
    directEmail: string;
    writeLabel: string;
  };
  notFound: {
    code: string;
    title: string;
    body: string;
    back: string;
  };
  project: {
    word: string;
    meta: { year: string; engine: string; role: string; studio: string };
    about: string;
    contribution: string;
    gallery: string;
    next: string;
  };
  lightbox: {
    enlarge: string;
    close: string;
    gallerySuffix: string;
    prev: string;
    next: string;
    goToPrefix: string;
  };
};

export const copy: Record<"es" | "en", Dict> = {
  es: {
    nav: {
      bio: "Bio",
      projects: "Proyectos",
      contact: "Contacto",
      back: "Volver al inicio",
    },
    langSwitch: { label: "Idioma", es: "ES", en: "EN" },
    hero: {
      kicker: "Portafolio",
      lede: "Produzco videojuegos y construyo las interfaces para garantizar una experiencia de juego memorable.",
      cta: "Ver proyectos",
    },
    bio: {
      label: "01 — Bio",
      title: ["Producción /", "Desarrollo UI"],
      lede: "Game Producer y UI Developer en Red Wine Interactive. Mi trabajo vive en dos lugares a la vez: la planificación que mantiene a un equipo avanzando y la interfaz que traduce un sistema complejo en algo que el jugador entiende sin pensarlo.",
      capabilities: [
        {
          title: "Producción",
          items: [
            "Milestones y roadmap",
            "Gestión de equipo",
            "Control de alcance",
            "Seguimiento de build",
          ],
        },
        {
          title: "UI Development",
          items: [
            "Arquitectura de menús",
            "HUD y feedback",
            "Prototipado de flujos",
            "Implementación in-engine",
          ],
        },
        {
          title: "Herramientas",
          items: ["Unity", "Unreal Engine", "Figma", "Jira / Notion"],
        },
      ],
    },
    projects: {
      label: "02 — Proyectos",
      title: "Red Wine Interactive",
    },
    card: {
      view: "Ver proyecto",
      viewLabel: "Ver",
    },
    footer: {
      label: "03 — Contacto",
      emailLabel: "Email",
      linksLabel: "Redes",
      linkedin: "LinkedIn",
      directEmail: "Correo directo",
      writeLabel: "Escribir",
    },
    notFound: {
      code: "Error 404",
      title: "Sin señal",
      body: "Esta página no existe o cambió de lugar.",
      back: "Volver al inicio",
    },
    project: {
      word: "Proyecto",
      meta: { year: "Año", engine: "Engine", role: "Rol", studio: "Estudio" },
      about: "Sobre el proyecto",
      contribution: "Mi aporte",
      gallery: "Galería",
      next: "Siguiente proyecto",
    },
    lightbox: {
      enlarge: "Ampliar",
      close: "Cerrar",
      gallerySuffix: "galería",
      prev: "Imagen anterior",
      next: "Imagen siguiente",
      goToPrefix: "Ir a la imagen",
    },
  },

  en: {
    nav: {
      bio: "Bio",
      projects: "Projects",
      contact: "Contact",
      back: "Back to home",
    },
    langSwitch: { label: "Language", es: "ES", en: "EN" },
    hero: {
      kicker: "Portfolio",
      lede: "I produce video games and build the interfaces that make each play experience memorable.",
      cta: "View projects",
    },
    bio: {
      label: "01 — Bio",
      title: ["Production /", "UI Development"],
      lede: "Game Producer and UI Developer at Red Wine Interactive. My work lives in two places at once: the planning that keeps a team moving forward, and the interface that turns a complex system into something the player understands without thinking about it.",
      capabilities: [
        {
          title: "Production",
          items: [
            "Milestones & roadmap",
            "Team management",
            "Scope control",
            "Build tracking",
          ],
        },
        {
          title: "UI Development",
          items: [
            "Menu architecture",
            "HUD & feedback",
            "Flow prototyping",
            "In-engine implementation",
          ],
        },
        {
          title: "Tools",
          items: ["Unity", "Unreal Engine", "Figma", "Jira / Notion"],
        },
      ],
    },
    projects: {
      label: "02 — Projects",
      title: "Red Wine Interactive",
    },
    card: {
      view: "View project",
      viewLabel: "View",
    },
    footer: {
      label: "03 — Contact",
      emailLabel: "Email",
      linksLabel: "Links",
      linkedin: "LinkedIn",
      directEmail: "Direct email",
      writeLabel: "Write",
    },
    notFound: {
      code: "Error 404",
      title: "No signal",
      body: "This page doesn't exist or has moved.",
      back: "Back to home",
    },
    project: {
      word: "Project",
      meta: { year: "Year", engine: "Engine", role: "Role", studio: "Studio" },
      about: "About the project",
      contribution: "My contribution",
      gallery: "Gallery",
      next: "Next project",
    },
    lightbox: {
      enlarge: "Enlarge",
      close: "Close",
      gallerySuffix: "gallery",
      prev: "Previous image",
      next: "Next image",
      goToPrefix: "Go to image",
    },
  },
};
