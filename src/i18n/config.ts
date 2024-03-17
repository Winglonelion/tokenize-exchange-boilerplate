import { initReactI18next } from "react-i18next";

import i18n from "i18next";

import enGb from "./translate";

const resources = {
  "en-GB": enGb,
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en-GB",
  returnEmptyString: false,
  compatibilityJSON: "v3",
  partialBundledLanguages: true,
  ns: [],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
