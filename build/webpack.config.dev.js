'use strict'
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  mode: 'development',
  entry: [
    './vue/entry-client.js',
    './vue/entry-server.js',
  ],
  output:{
    filename: 'main.js',
    path: path.resolve(process.cwd()+'/public', 'dist'),
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  node: {

  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(html)$/i,
        loader: 'file-loader'
      } ,     
      {
        test: /\.pug$/,
        oneOf: [{
            resourceQuery: /^\?vue/,
            use: ["pug-plain-loader"]
        }, {
            use: [
                "html-loader",
                "pug-loader",
                "vue-loader"
            ]
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: path.join(__dirname, '../public/views'),
      // Required - Routes to render.
      routes: [ '/', '/index', '/home', '/memes' ],
    })
  ]
}