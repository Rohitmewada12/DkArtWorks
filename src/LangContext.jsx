import translations from "./i18n.js";

const t = (key) => translations.en[key] ?? key;

export function LangProvider({ children }) {
  return children;
}

export default function useLang() {
  return { t, lang: "en" };
}
