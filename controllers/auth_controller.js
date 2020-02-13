const passport = require('koa-passport')
  , OAuth2Strategy = require('passport-oauth2').Strategy;
const axios = require('axios');
const session = require('koa-session');
const mysql = require('./mysql_controller');
const user = require('./user_controller');
const _ = require('underscore');


var auth_controller = auth_controller || {}
auth_controller = {
  oAuth2: {
    client_id: '426',
    client_secret: 'du3b7Y3wqgaePeWX3ZkHU1k45hlg0exU7rEPdTH7',
    callback_url: 'http://f2497d34.ngrok.io/login/callback',
    init: function () {
      passport.use(new OAuth2Strategy({
        authorizationURL: 'https://osu.ppy.sh/oauth/authorize',
        tokenURL: 'https://osu.ppy.sh/oauth/token',
        clientID: this.client_id,
        clientSecret: this.client_secret,
        callbackURL: this.callback_url
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
    },
    convertToken: async (main_sess, token, refreshToken) => {
      axios({
        method: 'GET',
        url: 'https://osu.ppy.sh/api/v2/me',
        headers: {
          Authorization: 'Bearer ' + token
        }
      }).then( async ({data}) => {
        const inGame = {
          id: data.id,
          username: data.username,
          country: data.country,
          joined: data.join_date,
          avatar_url: data.avatar_url,
          cover_url: data.cover_url,
          playmode: data.playmode,
          cover_img: data.cover_url,
          country: data.country.code,
          refresh_token : refreshToken, 
        }

        await user.creation(inGame);
        await auth_controller.sess.status(main_sess, inGame);
      });
    }
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