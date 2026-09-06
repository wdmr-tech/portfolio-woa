import Marquee from "@/components/Marquee";
import { MaskText, Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="invert-section bg-ink text-paper relative overflow-hidden pt-28 sm:pt-40"
    >
      <div className="shell">
        <Reveal className="font-mono text-label uppercase opacity-60">
          03 — Contacto
        </Reveal>
        <MaskText
          as="h2"
          className="text-headline mt-8 max-w-4xl font-medium"
          lines={["Hablemos de", "tu próximo juego"]}
          delay={0.05}
        />
      </div>

      <Reveal className="mt-16 opacity-25" delay={0.1}>
        <Marquee
          items={["Game Production", "UI Development", "Unity", "Unreal Engine"]}
        />
      </Reveal>

      <div className="shell mt-20 grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-8">
          <p className="font-mono text-label uppercase opacity-60">Email</p>
          <a
            href={`mailto:${site.email}`}
            data-cursor
            data-cursor-label="Escribir"
            className="group mt-4 inline-block text-[clamp(1.5rem,4.5vw,3.5rem)] font-medium tracking-tight break-all"
          >
            {site.email}
            <span className="block h-px w-full origin-left scale-x-0 bg-current transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
          </a>
        </Reveal>

        <Reveal className="md:col-span-4" delay={0.1}>
          <p className="font-mono text-label uppercase opacity-60">Redes</p>
          <ul className="mt-4 flex flex-col gap-3">
            <li>
              <FooterLink href={site.linkedin}>LinkedIn</FooterLink>
            </li>
            <li>
              <FooterLink href={`mailto:${site.email}`}>Correo directo</FooterLink>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="shell mt-24 flex flex-wrap items-center justify-between gap-4 border-t hairline py-8 font-mono text-label uppercase opacity-60">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>{site.role}</span>
        <span>{site.location}</span>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      data-cursor
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="group inline-flex items-center gap-2 text-xl tracking-tight sm:text-2xl"
    >
      {children}
      <span
        aria-hidden
        className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        ↗
      </span>
    </a>
  );
}
