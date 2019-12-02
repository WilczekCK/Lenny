const auth = require('../controllers/auth_controller');
const passport = require('koa-passport')

module.exports = ({ loginRoute }) => {
    auth.oAuth2.init();

    loginRoute.get('/', passport.authenticate('oauth2'));


    loginRoute.get('/callback', passport.authenticate('oauth2'), async (ctx) => {
        await auth.oAuth2.convertToken(ctx.req.user.accessToken);
        ctx.redirect('../')
    })



    // loginRoute.get('/oldcallback', passport.authenticate('oauth2', 
    // {
    //     session: true,
    //     failureRedirect: 'failed',
    //     successRedirect: 'correct'
    // }), async ({ req }) => {
    //     const { user } = req;
    //     await auth.oAuth2.convertToken(user.accessToken);
    // });

    loginRoute.get('/failed', async (ctx, next) => {
        ctx.throw(400, 'Error while logging')
    })
}

