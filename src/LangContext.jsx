import { createContext, useContext, useEffect, useMemo, useState } from "react";
import translations from "./i18n.js";

const STORAGE_KEY = "dkarts-lang";
const LangContext = createContext(null);

function getInitialLang() {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "hi") return saved;
  return navigator.language?.toLowerCase().startsWith("hi") ? "hi" : "en";
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo(() => {
    const dict = translations[lang] || translations.en;
    const t = (key) => dict[key] ?? translations.en[key] ?? key;
    const toggle = () => setLang((l) => (l === "en" ? "hi" : "en"));
    return { lang, t, toggle };
  }, [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export default function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LangProvider");
  }
  return ctx;
}
