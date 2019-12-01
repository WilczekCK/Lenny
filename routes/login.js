const auth = require('../controllers/auth_controller');
const passport = require('koa-passport') 

module.exports = ({ loginRoute }) => {
    auth.oAuth2.init();

    loginRoute.get('/', async(ctx, next) => {
        ctx.redirect('login/auth');
    }); 

    loginRoute.get('/auth', passport.authenticate('oauth2'));

    loginRoute.get('/callback', passport.authenticate('oauth2', {
        session: false,
        failureRedirect: 'failed',
        successRedirect: '/'
      }), async ({req}) => {
        const {user} = req;
        await auth.oAuth2.convertToken(user.accessToken);
    });

    loginRoute.get('/failed', async (ctx, next) => {
        ctx.throw(400, 'Error while logging')
    })
}

