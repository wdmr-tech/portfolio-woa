"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { easeOutExpo } from "@/lib/animations";
import { useLang } from "@/lib/i18n";
import { site } from "@/lib/site";

const NAV_ITEMS = [
  { key: "bio", href: "#bio" },
  { key: "projects", href: "#proyectos" },
  { key: "contact", href: "#contacto" },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();
  const { t } = useLang();
  const [condensed, setCondensed] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setCondensed(current > 32);
    setHidden(current > previous && current > 320);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: easeOutExpo, delay: hidden ? 0 : 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="shell flex justify-center pt-4 sm:pt-6">
        <div
          className={`nav-bar flex w-full items-center justify-center gap-4 rounded-full border border-transparent px-5 py-4 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500 sm:justify-between sm:gap-6 sm:px-8 sm:py-[1.15rem] ${
            condensed ? "glass text-ink" : "sm:bg-transparent"
          }`}
        >
          <Link
            href="/"
            className="hidden shrink-0 font-mono text-label tracking-[0.16em] whitespace-nowrap text-white uppercase mix-blend-difference sm:block"
            data-cursor
          >
            {site.name}
          </Link>

          <div className="flex items-center gap-5 sm:gap-8">
            <ul className="flex items-center gap-5 sm:gap-8">
              {isHome ? (
                NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <NavLink href={item.href}>{t.nav[item.key]}</NavLink>
                  </li>
                ))
              ) : (
                <>
                  <li className="hidden sm:block">
                    <NavLink href="/#proyectos">{t.nav.projects}</NavLink>
                  </li>
                  <li>
                    <NavLink href="/">{t.nav.back}</NavLink>
                  </li>
                </>
              )}
            </ul>

            <LangSwitch />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

function LangSwitch() {
  const { lang, setLang, t } = useLang();

  return (
    <div
      className="flex items-center gap-1.5 font-mono text-label text-white uppercase mix-blend-difference"
      role="group"
      aria-label={t.langSwitch.label}
    >
      {(["es", "en"] as const).map((code, index) => (
        <span key={code} className="flex items-center gap-1.5">
          {index === 1 && <span className="opacity-30">/</span>}
          <button
            type="button"
            onClick={() => setLang(code)}
            data-cursor
            aria-pressed={lang === code}
            className={`relative transition-opacity duration-300 ${
              lang === code ? "opacity-100" : "opacity-40 hover:opacity-70"
            }`}
          >
            {t.langSwitch[code]}
            <span
              className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                lang === code ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        </span>
      ))}
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      data-cursor
      className="group relative block font-mono text-label tracking-[0.16em] text-white uppercase mix-blend-difference"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
    </Link>
  );
}
