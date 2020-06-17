'use strict'
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: [
    './vue/app.js'
  ],
  output:{
    filename: 'main.js',
    path: path.resolve(process.cwd()+'/public', 'dist'),
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
                "pug-html-loader"
            ]
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}