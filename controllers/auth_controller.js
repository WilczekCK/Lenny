const passport = require('koa-passport')
     , OAuth2Strategy = require('passport-oauth2').Strategy;
const axios = require('axios');
const user = require('./user_controller');

var auth_controller = auth_controller || {}
auth_controller = {
    oAuth2: {
        client_id: '426',
        client_secret: 'du3b7Y3wqgaePeWX3ZkHU1k45hlg0exU7rEPdTH7',
        callback_url: 'http://11e79779.ngrok.io/login/callback',
        init: function (){
            passport.use(new OAuth2Strategy({ 
                authorizationURL: 'https://osu.ppy.sh/oauth/authorize',
                tokenURL: 'https://osu.ppy.sh/oauth/token',
                clientID: this.client_id,
                clientSecret: this.client_secret,
                callbackURL: this.callback_url
              },
              function(accessToken, refreshToken, cd, profile, done) {
                done(null, {accessToken: accessToken, refreshToken: refreshToken});
              }
              ));
            
              passport.serializeUser(function(user, done) {
                done(null, user);
              });
              
              passport.deserializeUser(function(user, done) {
                done(null, user);
              });
        },
        convertToken: function(token){
            axios({
                method: 'GET',
                url:'https://osu.ppy.sh/api/v2/me',
                headers:{
                  Authorization: 'Bearer '+token
                }
              }).then(({data}) => {  
                  const inGame = {
                        id: data.id,
                        username: data.username,
                        country: data.country,
                        joined: data.join_date,
                        avatar_url: data.avatar_url,
                        cover_url: data.cover_url,
                        playmode: data.playmode
                    }

                    user.creation(inGame);
              });
        }
    },
}



module.exports = auth_controller || 'There is a problem with a AUTH controller file';