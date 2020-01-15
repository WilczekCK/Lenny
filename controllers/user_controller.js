const _ = require('underscore');
const mysql = require('./mysql_controller');
const moment = require('moment')

var user_controller = user_controller || {}
user_controller = {
    creation: async (inGame) => {
        const [results] = await mysql.query(`SELECT * FROM users WHERE ingame_id = ${inGame.id}`);
        if(!results) return user_controller.newPlayer(inGame);
        console.log('Good Old fella')
    },
    newPlayer: async (inGame) => {
        console.log('New fella')

        mysql.query(`SELECT * FROM users WHERE ingame_id = ${inGame.id}`);
        await mysql.insert(`users`,
        `ingame_id, username, registered, role, refresh_token`,
        `${inGame.id}, '${inGame.username}','${moment().format('YYYY-MM-DD')}', 0, '${inGame.refresh_token}'`);
    },
    find: async (ingame_id) => {
        const profileInfo = await mysql.query(`SELECT * FROM users WHERE Ingame_id = ${ingame_id}`);
        if(_.isEmpty(profileInfo)) return false;
        else return profileInfo;

    }
}



module.exports = user_controller || 'There is a problem with an user controller file';