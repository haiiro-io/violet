const builtAt = new Date().toISOString();
const path = require('path');

module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  head: {
    title: 'Haiji Haiiro / Namika Hamasaki',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Planning/Design works by Haiji Haiiro' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/favicons/mstile-144x144.png' },
      { name: 'theme-color', content: '#c1c1c1' },
      { name: 'author', content: 'Haiji Haiiro / Namika Hamasaki' }, // should be switched by domain
      { name: 'robots', content: 'noindex nofollow' }, // switch after launch
      { name: 'og:url', content: 'https://haiji.co' }, // should be switched by domain
      { name: 'og:type', content: 'profile' },
      { name: 'og:title', content: 'Haiji Haiiro / Namika Hamasaki' }, // should be switched by domain
      { name: 'og:description', content: 'Works by Haiji Haiiro' }, // should be switched by domain
      { name: 'og:image', content: 'https://new.haiji.co/ogp_1200x630.jpg' }, // should be switched by domain
      { name: 'og:updated_time', content: builtAt },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@haiji505' },
      { name: 'twitter:description', content: 'Works by Haiji Haiiro' }, // should be switched by domain
      { name: 'twitter:image', content: 'https://haiji.co/ogp_1200x630.jpg' } // should be switched by domain
    ],
    link: [
      { rel: 'canonical', href: 'https://haiji.co' }, // should be switched by domain
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
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#555555' },
  /*
  ** Build configuration
  */
  css: [],
  build: {
    vendor: ['axios', 'vuex-class', 'nuxt-class-component'],
    extend (config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'raw-loader',
        include: path.resolve(__dirname, 'contents/works')
      });
      config.resolve.extensions.push('.md');
    }
  },
  modules: ['~/modules/typescript'],
  generate: {
    fallback: true,
    routes: [
      '/about',
      '/works/signifiant',
      '/works/laughly'
    ]
  }
}
