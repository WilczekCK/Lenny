import * as mysql from './controllers/mysql.js';

export function printRoutes (router) {
    return router.get('/', async (ctx, next) => {
      const xd = await mysql.query('SELECT * FROM users');

      ctx.type = 'json'
      ctx.body = {
        message: xd
      }
    })
} 