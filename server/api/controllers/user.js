import _ from 'underscore';
import moment from 'moment';
import * as mysql from './mysql.js';

export async function creation (userInfo) {
    const [results] = await mysql.query(`SELECT * FROM users WHERE fb_id = ${userInfo.fb_id}`);
    if(!results) return newPlayer(userInfo);
}

export async function newPlayer (userInfo) {
    await mysql.insert(`users`,
    `fb_id, username, registered, role, token`,
    `${userInfo.fb_id}, '${userInfo.username}','${moment().format('YYYY-MM-DD')}', 0, '${userInfo.token}'`);
}

export async function find(fb_id) {
    const profileInfo = await mysql.query(`SELECT * FROM users WHERE fb_id = ${fb_id}`);
    if(_.isEmpty(profileInfo)) return false;
    else return profileInfo;
}

export async function profile_detailed_meme (fb_id) {
    const memesInfo = await mysql.query(`SELECT COUNT(id) AS memes_count, SUM(likes) as sum_likes FROM images WHERE author_id = ${fb_id}`);
    if(_.isEmpty(memesInfo)) return false;
    else return memesInfo;
}

export async function blockUser (ingame_id) {
    //blocking user also removes all comments
    await mysql.remove(`comments`, `ingame_id = ${ingame_id}`);
    return await mysql.update(`users`, `role = -1`, `ingame_id = ${ingame_id}`);
}