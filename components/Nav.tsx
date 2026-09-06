"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { easeOutExpo } from "@/lib/animations";
import { nav, site } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();
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
          className={`flex w-full items-center justify-center gap-4 rounded-full px-4 py-3 transition-[background-color,box-shadow,backdrop-filter] duration-500 sm:justify-between sm:gap-6 sm:px-7 ${
            condensed
              ? "glass text-ink shadow-[0_1px_0_0_rgba(10,10,10,0.08)]"
              : "bg-transparent"
          }`}
        >
          <Link
            href="/"
            className="hidden shrink-0 font-mono text-label tracking-[0.16em] whitespace-nowrap uppercase mix-blend-difference text-white sm:block"
            data-cursor
          >
            {site.name}
          </Link>

          <ul className="flex items-center gap-5 sm:gap-8">
            {isHome ? (
              nav.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ))
            ) : (
              <>
                <li className="hidden sm:block">
                  <NavLink href="/#proyectos">Proyectos</NavLink>
                </li>
                <li>
                  <NavLink href="/">Volver al inicio</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </motion.header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      data-cursor
      className="group relative block font-mono text-label tracking-[0.16em] uppercase mix-blend-difference text-white"
    >
      {children}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
    </Link>
  );
}
