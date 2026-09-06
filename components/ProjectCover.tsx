"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src?: string;
  alt: string;
  title: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Portada del proyecto con reserva propia: mientras no exista el archivo en
 * `public/images/...` se dibuja un placeholder en blanco y negro en vez de
 * una imagen rota.
 */
export default function ProjectCover({
  src,
  alt,
  title,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className = "",
}: Props) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <CoverPlaceholder title={title} className={className} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

function CoverPlaceholder({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`absolute inset-0 flex items-center justify-center bg-[#0a0a0a] ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 9px)",
      }}
    >
      <span className="font-mono text-label text-white/40 uppercase">
        {title}
      </span>
    </div>
  );
}
