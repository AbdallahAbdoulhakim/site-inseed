import type { StrapiApp } from "@strapi/strapi/admin";
import favicon from "./extensions/favicon.ico";
import logo from "./extensions/INSEED_logo.png";

export default {
  config: {
    locales: [
      // 'ar',
      "fr",
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
    head: {
      favicon: favicon,
    },
    auth: {
      logo: logo,
    },
    menu: {
      logo: logo,
    },
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome to INSEED",
        "Auth.form.welcome.subtitle": "Login to your backend Account",
      },
      fr: {
        "Auth.form.welcome.title": "Bienvenue à l'INSEED",
        "Auth.form.welcome.subtitle": "Connectez-vous à votre compte",
      },
    },
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
