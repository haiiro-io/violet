const builtAt = new Date().toISOString();
const path = require('path');

const buildLocale = process.env.BUILD_LOCALE || 'en';
const productionUrl = {
  en: "https://namika.hmsk.co",
  ja: "https://haiji.co"
};
const baseUrl = productionUrl[buildLocale];

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
];

module.exports = {
  env: {
    baseUrl,
    buildLocale,
    productionUrl,
    orderedWorks
  },
  head: {
    title: 'Haiji Haiiro / Namika Hamasaki',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' },
      { name: 'theme-color', content: '#c1c1c1' },
      { name: 'robots', content: 'noindex nofollow' }, // switch after launch
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@haiji505' },
      { property: 'og:type', content: 'profile' },
      { property: 'og:updated_time', content: builtAt }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-16x16.png', sizes: '16x16' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: '/favicons/favicon-48x48.png', sizes: '48x48' },
      { rel: 'icon', type: 'image/png', href: '/favicons/android-chrome-96x96.png', sizes: '96x96' },
      { rel: 'icon', type: 'image/png', href: '/favicons/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-57x57.png', sizes: '57x57' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-60x60.png', sizes: '60x60' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-72x72.png', sizes: '72x72' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-76x76.png', sizes: '76x76' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-114x114.png', sizes: '114x114' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-120x120.png', sizes: '120x120' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-144x144.png', sizes: '144x144' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-152x152.png', sizes: '152x152' },
      { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon-180x180.png', sizes: '180x180' },
      { rel: 'mask-icon', type: 'image/png', href: '/favicons/safari-pinned-tab.svg', color: '#c1c1c1' },
      { rel: 'manifest', href: '/manifest.json' }
    ],
    script: [
      { src: 'https://use.typekit.net/sff2rot.js', defer: true }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#555555' },
  /*
  ** Build configuration
  */
  css: [
    { src: 'node_modules/normalize.css/normalize.css', lang: 'css' }
  ],
  build: {
    vendor: [
      'medium-zoom',
      'nuxt-class-component',
      'vue-carousel',
      'vue-i18n',
      'vuex-class',
      'youtube-player'
    ],
    extend (config, { isDev, isClient }) {
      // remove existing url-loader settings once, for giving svg specific loader
      const rule = config.module.rules.find(r => r.test.toString() === '/\\.(png|jpe?g|gif|svg)$/');
      config.module.rules.splice(config.module.rules.indexOf(rule), 1);

      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'contents'),
        options: {
          vue: {
            root: "dynamicMarkdown"
          }
        }
      }, {
        test: /\.yaml$/,
        loaders: [
          'json-loader',
          'yaml-loader'
        ],
        include: path.resolve(__dirname, 'locales')
      }, {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        query: {
          name: 'img/[name].[hash:7].[ext]'
        }
      }, {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: path.resolve(__dirname, 'assets/icons')
      });
    },
    postcss: {
      plugins: {
        'postcss-import': {
          resolve (id, baseDir) {
            return (/^~/.test(id)) ? path.resolve(__dirname, id.replace("~", ".")) : path.resolve(baseDir, id);
          }
        },
        'postcss-cssnext': {
          features: {
            customProperties: {
              variables: {
                'skyhai': '#DFE0E0',
                'soba': '#D8D8D8',
                'konezumi': '#555555',
                'nibihai': '#999999'
              }
            }
          }
        }
      }
    }
  },
  plugins: ['~/plugins/i18n', '~/plugins/lazyload'],
  modules: [
    '~/modules/typescript',
    ['@nuxtjs/google-analytics', {
      id: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'UA-XXXXXXXX-X'
    }]
  ],
  generate: {
    fallback: true,
    subFolders: false,
    routes: [
      '/about',
      '/contact',
    ].concat(orderedWorks.map(w => `/work/${w}`))
  }
}
