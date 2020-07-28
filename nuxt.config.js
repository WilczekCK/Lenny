// https://nuxtjs.org/api/configuration-build
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/js/all.min.js'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  env: {
    HOST_URL: process.env.HOST_URL || 'http://localhost:3000'
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

  toast: {
    position: 'bottom-right',
    register: [ 
      //custom toasts!
    ],
    duration : 2000
}

}
