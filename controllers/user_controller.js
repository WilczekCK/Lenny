const _ = require('underscore');
const mysql = require('./mysql_controller');
const moment = require('moment')

var user_controller = user_controller || {}
user_controller = {
    creation: async (userInfo) => {
        const [results] = await mysql.query(`SELECT * FROM users WHERE fb_id = ${userInfo.fb_id}`);
        if(!results) return user_controller.newPlayer(userInfo);
    },
    newPlayer: async (userInfo) => {
        await mysql.insert(`users`,
        `fb_id, username, registered, role, token`,
        `${userInfo.fb_id}, '${userInfo.username}','${moment().format('YYYY-MM-DD')}', 0, '${userInfo.token}'`);
    },
    find: async (ingame_id) => {
        const profileInfo = await mysql.query(`SELECT * FROM users WHERE id = ${ingame_id}`);
        if(_.isEmpty(profileInfo)) return false;
        else return profileInfo;
    },
    profile_detailed_meme: async (ingame_id) => {
        const memesInfo = await mysql.query(`SELECT COUNT(id) AS memes_count, SUM(likes) as sum_likes FROM images WHERE author_id = ${ingame_id}`);
        if(_.isEmpty(memesInfo)) return false;
        else return memesInfo;
    },
    blockUser: async (ingame_id) => {
        //blocking user also removes all comments
        await mysql.delete(`comments`, `ingame_id = ${ingame_id}`);
        return await mysql.update(`users`, `role = -1`, `ingame_id = ${ingame_id}`);
    }
}


module.exports = user_controller || 'There is a problem with an user controller file';