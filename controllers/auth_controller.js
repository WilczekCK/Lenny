const passport = require('koa-passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
const axios = require('axios');
const session = require('koa-session');
const mysql = require('./mysql_controller');
const user = require('./user_controller');
const _ = require('underscore');


var auth_controller = auth_controller || {}
auth_controller = {
  oAuth2: {
    app_id: '2343223032645422',
    secret: 'c5a0a134d962fce685a1671418f46920',
    callback_url: 'https://5bd177b07dd7.ngrok.io/login/callback',
    init: () => {
      passport.use(new FacebookStrategy({
        clientID: '2343223032645422',
        clientSecret: 'c5a0a134d962fce685a1671418f46920',
        callbackURL: 'https://5bd177b07dd7.ngrok.io/login/callback'
      },
      function (accessToken, refreshToken, cd, profile, done) {
        done(null, { accessToken: accessToken, refreshToken: refreshToken });
      }
    ));
      passport.serializeUser(function (user, done) {
        done(null, user);
      });

      passport.deserializeUser(function (user, done) {
        done(null, user);
      });
      }
    },
    convertToken: async (main_sess, token, refreshToken) => {
      axios({
        method: 'GET',
        url: `https://graph.facebook.com/me?fields=id,name&access_token=${token}`,
      }).then( async ({data}) => {
        console.log(data)

       // await user.creation(inGame);
        //await auth_controller.sess.status(main_sess, inGame);
      });
    },
  sess: {
    status: async (main_sess, inGame) => {
      if(_.isEmpty(main_sess.passport)) return 0;
      const findRefreshToken = await mysql.query(`SELECT * FROM users WHERE refresh_token = '${main_sess.passport.user.refreshToken}'`);

      if(_.isEmpty(findRefreshToken)) return await auth_controller.sess.refresh(main_sess.passport.user.refreshToken, inGame);
      return findRefreshToken;
    },
    refresh: async (refreshToken, inGame) => {
      if(_.isEmpty(inGame) || _.isEmpty(refreshToken)) return 0;
      await mysql.update(`users`, `refresh_token = '${refreshToken}'`, `ingame_id = ${inGame.id}`);
    }
  }, 
  logout: function(main_sess){
    main_sess.session = null;
    main_sess.req.body = null;
  }
}



module.exports = auth_controller || 'There is a problem with a AUTH controller file';