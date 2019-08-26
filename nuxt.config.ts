import path from "path";

const builtAt = new Date().toISOString();
import ja from "./locales/ja.json";
import en from "./locales/en.json";

const buildLocale = process.env.BUILD_LOCALE || "en";
const productionUrlEn = "https://namika.hmsk.co";
const productionUrlJa = "https://haiji.co";

const baseUrl = buildLocale === "en" ? productionUrlEn : productionUrlJa;

const orderedWorks = [
  "laughly",
  "finery",
  "stimpacks",
  "wonolo",
  "pokemon-go",
  "amazarashi",
  "libzcareer",
  "weekend-creator",
  "signifiant",
  "remote-style",
  "dcf",
  "googleplay-game-effect",
  "logofolio"
].join(",");

const config = {
  buildModules: ['@nuxt/typescript-build'],
  mode: "spa",
  env: {
    baseUrl,
    buildLocale,
    productionUrlEn,
    productionUrlJa,
    orderedWorks
  },
  head: {
    title: "Haiji Haiiro / Namika Hamasaki",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"
      },
      { name: "msapplication-TileColor", content: "#ffffff" },
      {
        name: "msapplication-TileImage",
        content: "/favicons/mstile-144x144.png"
      },
      { name: "theme-color", content: "#c1c1c1" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@haiji505" },
      { property: "og:type", content: "profile" },
      { property: "og:updated_time", content: builtAt },

      // Remove the chunk below after Nuxt's problem is cleared
      { hid: "author", name: "author", content: buildLocale === "en" ? "Namika Hamasaki" : "灰色ハイジ" },
      { hid: "description", name: "description", property: "og:description", content: buildLocale === "en" ? "Namika is a Product Designer based in San Francisco." : "サンフランシスコを拠点とするプロダクトデザイナーのポートフォリオです。" },
      { hid: "og:title", property: "og:title", content: buildLocale === "en" ? "Namika Hamasaki — Product Designer" : "灰色ハイジのポートフォリオ" },
      { hid: "og:image", property: "og:image", content: `${baseUrl}/images/ogp_1200x630.jpg` },
      { hid: "twitter:description", name: "twitter:description", content: buildLocale === "en" ? "Namika is a Product Designer based in San Francisco." : "サンフランシスコを拠点とするプロダクトデザイナーのポートフォリオです。" },
      { hid: "twitter:image", name: "twitter:image", content: `${baseUrl}/images/ogp_1200x630.jpg` }
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicons/favicon-16x16.png",
        sizes: "16x16"
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicons/favicon-32x32.png",
        sizes: "32x32"
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicons/favicon-48x48.png",
        sizes: "48x48"
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicons/android-chrome-96x96.png",
        sizes: "96x96"
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicons/android-chrome-192x192.png",
        sizes: "192x192"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-57x57.png",
        sizes: "57x57"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-60x60.png",
        sizes: "60x60"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-72x72.png",
        sizes: "72x72"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-76x76.png",
        sizes: "76x76"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-114x114.png",
        sizes: "114x114"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-120x120.png",
        sizes: "120x120"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-144x144.png",
        sizes: "144x144"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-152x152.png",
        sizes: "152x152"
      },
      {
        rel: "apple-touch-icon",
        href: "/favicons/apple-touch-icon-180x180.png",
        sizes: "180x180"
      },
      {
        rel: "mask-icon",
        type: "image/png",
        href: "/favicons/safari-pinned-tab.svg",
        color: "#c1c1c1"
      },
      { rel: "manifest", href: "/manifest.json" }
    ],
    script: [{ src: "https://use.typekit.net/sff2rot.js", defer: true }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#555555" },
  /*
   ** Build configuration
   */
  css: [{ src: "node_modules/normalize.css/normalize.css", lang: "css" }],
  build: {
    extend(config): void {
      // remove existing url-loader settings once, for giving svg specific loader
      const rule = config.module.rules.find(r => r.test.toString().includes("(png|jpe?g|gif|svg|webp)"));
      config.module.rules.splice(config.module.rules.indexOf(rule), 1);

      config.module.rules.push(
        {
          test: /\.md$/,
          loader: "frontmatter-markdown-loader",
          include: path.resolve(__dirname, "contents"),
          options: {
            vue: {
              root: "dynamicMarkdown"
            }
          }
        },
        {
          ...rule,
          test: /\.(png|jpe?g|gif|webp)$/
        },
        {
          test: /\.svg$/,
          loader: "svg-sprite-loader",
          include: path.resolve(__dirname, "assets/icons")
        }
      );
    },
    postcss: {
      plugins: {
        "postcss-import": {
          resolve (id: string, baseDir: string): string {
            return (/^~/.test(id)) ? path.resolve(__dirname, id.replace("~", ".")) : path.resolve(baseDir, id);
          }
        },
      },
      preset: {
        stage: 0,
        preserve: false,
        importFrom: [{
          customProperties: {
            "--skyhai": "#DFE0E0",
            "--soba": "#D8D8D8",
            "--konezumi": "#555555",
            "--nibihai": "#999999"
          }
        }]
      }
    }
  },
  plugins: ["~/plugins/lazyload"],
  modules: [
    [
      "@nuxtjs/google-analytics",
      {
        id: process.env.GOOGLE_ANALYTICS_TRACKING_ID || "UA-XXXXXXXX-X"
      }
    ],
    [
      "nuxt-i18n",
      {
        detectBrowserLanguage: false,
        seo: false,
        parsePages: false,
        locales: [
          { code: "en", domain: "namika.hmsk.co" },
          { code: "ja", domain: "haiji.co" }
        ],
        differentDomains: true,
        defaultLocale: buildLocale,
        vueI18n: {
          fallbackLocale: "en",
          messages: {
            en,
            ja
          }
        },
        silentTranslationWarn: true
      }
    ]
  ],
  generate: {
    fallback: true,
    subFolders: false,
    routes: ["/about", "/contact"].concat(orderedWorks.split(",").map(w => `/work/${w}`))
  }
};

export default config;
