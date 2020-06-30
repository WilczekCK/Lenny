import passport from 'koa-passport'
import FacebookStrategy from ('passport-facebook'.Strategy);
import axios from 'axios';
import session from 'koa-session';
import _ from 'underscore';

import mysql from './mysql_controller';
import user from './user_controller';

const oAuth2 = {
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
}
    
export async function convertToken (main_sess, token) {
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
        await sess.status(main_sess, data);
    });
}


const sess = {
    status: async ({passport}, data) => {
        if(_.isEmpty(passport)) return 0;
        
        const {accessToken} = passport.user;
        const findOldToken = await mysql.query(`SELECT * FROM users WHERE token = '${accessToken}'`);

        if(_.isEmpty(findOldToken)) return await sess.refresh(accessToken, data);
        return findOldToken;
    },
    refresh: async (token, data) => {
        if(_.isEmpty(data) || _.isEmpty(token)) return 0;
        await mysql.update(`users`, `token = '${token}'`, `fb_id = ${data.fb_id}`);
    }, 
    logout: function (sess) {
        sess.session = null;
        sess.req.body = null;
    }
}