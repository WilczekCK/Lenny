import * as mysql from './controllers/mysql.js';

export function printRoutes (router) {
    return router.get('/', async (ctx, next) => {
      ctx.type = 'json'
      ctx.body = {
        message: xd
      }
    })
} 