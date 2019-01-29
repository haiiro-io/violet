declare namespace NodeJS {
  interface ProcessEnv {
    BUILD_LOCALE: "en" | "ja";
    GOOGLE_ANALYTICS_TRACKING_ID: string;
    baseUrl:  string;
    buildLocale: "en" | "ja";
    productionUrlEn: string;
    productionUrlJa: string;
    orderedWorks: string;
  }
}
