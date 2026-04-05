import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { triggerRelayout } from "./utils";

const DEBUG = process.env.NODE_ENV === "development" && sessionStorage.i18nDebug;

if (DEBUG) {
  sessionStorage.removeItem("__i18nMissingKeys");
}

i18n
  .use({
    type: "backend",
    read(language: string, namespace: string, callback: (errorValue: unknown, translations: null | unknown) => void) {
      import(`./locales/${language}.json`)
        .then((resources) => {
          resources = resources.default;
          callback(null, { ...resources["default"], ...resources[namespace] });
        })
        .catch((error) => {
          callback(error, null);
        });
    },
  })
  .use(initReactI18next)
  .init({
    lowerCaseLng: true,
    lng: "ja",
    fallbackLng: "ja",
    defaultNS: "default",
    debug: DEBUG,

    returnEmptyString: false,
    returnNull: false,

    saveMissing: DEBUG,
    missingKeyHandler: DEBUG
      ? function (lng, ns, key) {
          const missingKeys = JSON.parse(sessionStorage.getItem("__i18nMissingKeys") || "{}") || {};
          const l = i18n.language;
          missingKeys[l] = missingKeys[l] || {};
          missingKeys[l][ns] = missingKeys[l][ns] || {};
          missingKeys[l][ns][key] = "";
          sessionStorage.setItem("__i18nMissingKeys", JSON.stringify(missingKeys));
        }
      : false,

    nsSeparator: false,
    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

if ("document" in global) {
  // Fix error in node
  i18n.on("languageChanged", function () {
    document.documentElement.lang = i18n.language;
    triggerRelayout();
  });
}

export default i18n;
