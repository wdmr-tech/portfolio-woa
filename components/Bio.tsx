import { MaskText, Reveal, RevealGroup } from "@/components/Reveal";
import { fadeUp } from "@/lib/animations";

const PARAGRAPHS = [
  "Soy Wladimir Acevedo, Game Producer y UI Developer en Red Wine Interactive. Mi trabajo vive en dos lugares a la vez: la planificación que mantiene a un equipo avanzando y la interfaz que traduce un sistema complejo en algo que el jugador entiende sin pensarlo.",
  "Como productor defino alcance, milestones y la comunicación entre disciplinas — arte, programación y narrativa — para que las decisiones se tomen a tiempo y las builds lleguen. Como UI developer implemento menús, HUD y flujos de navegación en Unity y Unreal Engine, cuidando jerarquía, feedback y el tono visual de cada proyecto.",
  "Me interesa el punto donde producción y diseño se cruzan: entender por qué una pantalla no funciona suele ser un problema de proceso tanto como de layout.",
];

const CAPABILITIES = [
  {
    title: "Producción",
    items: ["Milestones y roadmap", "Gestión de equipo", "Control de alcance", "Seguimiento de build"],
  },
  {
    title: "UI Development",
    items: ["Arquitectura de menús", "HUD y feedback", "Prototipado de flujos", "Implementación in-engine"],
  },
  {
    title: "Herramientas",
    items: ["Unity", "Unreal Engine", "Figma", "Jira / Notion"],
  },
];

export default function Bio() {
  return (
    <section
      id="bio"
      className="invert-section bg-ink text-paper relative py-28 sm:py-40"
    >
      <div className="shell grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal className="font-mono text-label uppercase opacity-60">
            01 — Bio
          </Reveal>
          <MaskText
            as="h2"
            className="text-headline mt-8 font-medium"
            lines={["Producción", "e interfaz"]}
            delay={0.05}
          />
        </div>

        <RevealGroup className="flex flex-col gap-7 md:col-span-7 md:col-start-6" step={0.12}>
          {PARAGRAPHS.map((paragraph, index) => (
            <Reveal
              as="p"
              key={index}
              variants={fadeUp}
              className={
                index === 0
                  ? "text-lede"
                  : "max-w-2xl text-base leading-relaxed opacity-70 sm:text-lg"
              }
            >
              {paragraph}
            </Reveal>
          ))}
        </RevealGroup>
      </div>

      <div className="shell mt-24 sm:mt-32">
        <RevealGroup className="grid gap-px border-t hairline sm:grid-cols-3" step={0.1}>
          {CAPABILITIES.map((group) => (
            <Reveal key={group.title} className="pt-8 sm:pr-8">
              <h3 className="font-mono text-label uppercase opacity-60">
                {group.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="text-lg tracking-tight sm:text-xl">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
