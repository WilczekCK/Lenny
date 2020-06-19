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
    callback_url: 'https://fa94ec332721.ngrok.io/login/callback',
    init: () => {
      passport.use(new FacebookStrategy({
        clientID: '2343223032645422',
        clientSecret: 'c5a0a134d962fce685a1671418f46920',
        callbackURL: 'https://fa94ec332721.ngrok.io/login/callback'
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
    convertToken: async (main_sess, token) => {
      axios({
        method: 'GET',
        url: `https://graph.facebook.com/me?fields=id,email,short_name&access_token=${token}`,
      }).then( async ({data}) => {
        var data = {
          username: data.short_name,
          fb_id: data.id,
          email: data.email,
          token: token
        }
        await user.creation(data, token);
        await auth_controller.sess.status(main_sess, data);
      });
    },
  sess: {
    status: async ({passport}, data) => {
      if(_.isEmpty(passport)) return 0;
      
      const {accessToken} = passport.user;
      const findOldToken = await mysql.query(`SELECT * FROM users WHERE token = '${accessToken}'`);

      if(_.isEmpty(findOldToken)) return await auth_controller.sess.refresh(accessToken, data);
      return findOldToken;
    },
    refresh: async (token, data) => {
      if(_.isEmpty(data) || _.isEmpty(token)) return 0;
      await mysql.update(`users`, `token = '${token}'`, `fb_id = ${data.fb_id}`);
    }
  }, 
  logout: function(main_sess){
    main_sess.session = null;
    main_sess.req.body = null;
  }
}



module.exports = auth_controller || 'There is a problem with a AUTH controller file';