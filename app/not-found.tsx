import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-svh flex-col justify-center py-32">
      <p className="font-mono text-label uppercase opacity-60">Error 404</p>
      <h1 className="text-display mt-8 font-medium">Sin señal</h1>
      <p className="text-lede mt-8 max-w-lg opacity-70">
        Esta página no existe o cambió de lugar.
      </p>
      <Link
        href="/"
        data-cursor
        className="group mt-12 inline-flex w-fit items-center gap-3 border-b hairline pb-2 font-mono text-label uppercase"
      >
        Volver al inicio
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
