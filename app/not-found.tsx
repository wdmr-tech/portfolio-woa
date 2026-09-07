"use client";

import Link from "next/link";

import { useLang } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLang();

  return (
    <section className="shell flex min-h-svh flex-col justify-center py-32">
      <p className="font-mono text-label uppercase opacity-60">
        {t.notFound.code}
      </p>
      <h1 className="text-display mt-8 font-medium">{t.notFound.title}</h1>
      <p className="text-lede mt-8 max-w-lg opacity-70">{t.notFound.body}</p>
      <Link
        href="/"
        data-cursor
        className="group mt-12 inline-flex w-fit items-center gap-3 border-b hairline pb-2 font-mono text-label uppercase"
      >
        {t.notFound.back}
        <span
          aria-hidden
          className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1"
        >
          ←
        </span>
      </Link>
    </section>
  );
}
