import passport from 'koa-passport'
import FacebookStrategy from 'passport-facebook';
import axios from 'axios';
import session from 'koa-session';
import _ from 'underscore';

import * as mysql from './mysql';
import * as user from './user';

const oAuth2 = {
    init: () => {
      passport.use(new FacebookStrategy({
        clientID: '2343223032645422',
        clientSecret: 'c5a0a134d962fce685a1671418f46920',
        callbackURL: 'https://0992578b1697.ngrok.io/api/login/callback'
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

export {oAuth2};
    
export async function convertToken (main_sess, token) {
    axios({
        method: 'GET',
        url: `https://graph.facebook.com/me?fields=id,email,short_name&access_token=${token}`,
    }).then( async ({data}) => {
        var tokenData = {
            username: data.short_name,
            fb_id: data.id,
            email: data.email,
            token: token
        }

        
        await user.creation(tokenData, token);
        await sess.status(main_sess, tokenData);
    });
}


const sess = {
    status: async (session, data) => {
        if(_.isEmpty(session.passport)) return 0;

        var {passport} = session;
        const {accessToken} = passport.user;
        const findOldToken = await mysql.query(`SELECT * FROM users WHERE token = '${accessToken}'`);
        //await sess.forUser(data, passport);

        if(_.isEmpty(findOldToken)) return await sess.refresh(accessToken, data);
        return findOldToken;
    },
    forUser: async function (data, session) {
      if(!data) return 0;
      session.userData = {username: data.username, id: data.fb_id}
      console.log(session.userData)
    },
    refresh: async (token, data) => {
        if(_.isEmpty(data) || _.isEmpty(token)) return 0;
        
        await mysql.update(`users`, `token = '${token}'`, `fb_id = ${data.fb_id}`);
    }, 
    logout: function (sess) {
        sess.session = null;
        sess.req.body = null;
        return true;
    }
}

export {sess};