"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { copy, type Dict } from "@/content/copy";

export type Lang = "es" | "en";

const STORAGE_KEY = "woa-lang";
const HTML_LANG: Record<Lang, string> = { es: "es-CL", en: "en" };

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  // Rehidrata la preferencia guardada tras el primer render (evita mismatch de
  // hidratación: el servidor siempre renderiza "es").
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "es" || stored === "en") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLangState(stored);
      }
    } catch {
      /* localStorage no disponible */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* noop */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: copy[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  }
  return ctx;
}
