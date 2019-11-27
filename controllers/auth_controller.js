const passport = require('koa-passport');

var auth_controller = auth_controller || {}
auth_controller = {
    oAuth2: {
        client_id: '193',
        client_secret: 'NotPublic',
        callback_url: 'http://11e79779.ngrok.io/login/callback'
    }
}



module.exports = auth_controller || 'There is a problem with a AUTH controller file';