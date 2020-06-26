'use strict'

export default {
  app: {
    name: 'something',
    version: '1.0.0'
  },
  database: {
    //driver: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'memepage',
    user: 'root',
    password: 'rootpass',
    //options: {
    //}
  },
  server: {
    port: 3000
  },
  static_dir: {
    root: './static',
    options: {}
  },
  session: {
    secretKey: 'something'
  }
}