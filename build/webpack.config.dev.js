'use strict'
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    new VueLoaderPlugin()
  ]
}