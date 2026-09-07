"use client";

import { MaskText, Reveal, RevealGroup } from "@/components/Reveal";
import { fadeUp } from "@/lib/animations";
import { useLang } from "@/lib/i18n";

export default function Bio() {
  const { t } = useLang();

  return (
    <section
      id="bio"
      className="invert-section bg-ink text-paper relative py-28 sm:py-40"
    >
      <div className="shell grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal className="font-mono text-label uppercase opacity-60">
            {t.bio.label}
          </Reveal>
          <MaskText
            as="h2"
            className="mt-8 font-medium leading-[0.95] tracking-[-0.03em] text-[clamp(2.25rem,5.5vw,4.5rem)]"
            lines={t.bio.title}
            delay={0.05}
          />
        </div>

        <RevealGroup
          className="flex flex-col gap-7 md:col-span-7 md:col-start-6"
          step={0.12}
        >
          <Reveal as="p" variants={fadeUp} className="text-lede">
            {t.bio.lede}
          </Reveal>
        </RevealGroup>
      </div>

      <div className="shell mt-24 sm:mt-32">
        <RevealGroup
          className="grid gap-px border-t hairline sm:grid-cols-3"
          step={0.1}
        >
          {t.bio.capabilities.map((group) => (
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
