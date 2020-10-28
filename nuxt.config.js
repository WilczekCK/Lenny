// https://nuxtjs.org/api/configuration-build
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Lenny - KoaJS and NuxtJS meme template',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'KoaJS and NuxtJS meme template' },
      { name: 'charset', content: 'utf-8' },

      { property: "og:title", content: "Lenny"},
      { property: "og:description", content: "KoaJS and NuxtJS meme template"},
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/js/all.min.js'},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
      { href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@200;400;500&display=swap'}
    ]
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  plugins: [
    {src: '~/plugins/infiniteLoading.js', ssr: false},
    {src: '~/plugins/iframe.js', ssr: false}
  ],
  /*
  ** Global CSS
  */
  css: [
    '~/assets/scss/main.scss',
    '~/assets/css/normalize.css'
  ],
  loading:{
    color:'#9165BC'
  },
  modules: [
    ['@nuxtjs/axios'],
    ['@nuxtjs/toast'],
    ['@nuxtjs/moment'],
    ['@nuxtjs/google-adsense', {
      id: 'ca-pub-#######'
    }], 
    [
        'nuxt-sass-resources-loader', 
        [
            '~/assets/scss/main.scss'
        ],
    ],
    [
      'cookie-universal-nuxt'
    ],
  ],

  axios: {
    proxy: true // Can be also an object with default options
  },

  proxy: {
    '/api/': 'localhost:3000/api/'
  },

  toast: {
    position: 'bottom-right',
    register: [ 
      //custom toasts!
    ],
    duration : 2000
}

}
