import { type Request } from "express";
import i18next from "i18next";
import i18nextMiddleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
  });

// Create a type that represents all the nested keys of the translation object
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string ? (T[K] extends object ? `${K}.${NestedKeyOf<T[K]>}` : K) : never;
    }[keyof T]
  : never;
const keys = { ...en } as const;
type TranslationKeys = NestedKeyOf<typeof keys>;

function t(key: TranslationKeys, option: Request | { lang: string | undefined }) {
  if ("lang" in option) {
    return i18next.t(key, { lng: option.lang?.toLocaleLowerCase() });
  }
  return option.t(key);
}

export { i18next, i18nextMiddleware, t };