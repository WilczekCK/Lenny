import _ from 'underscore';
import moment from 'moment';
import * as mysql from './mysql.js';
import fs from 'fs';

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

export async function changeInfo(fb_id, changeClause){
    console.log(`UPDATE users SET ${changeClause} WHERE fb_id = ${fb_id}`)
    await mysql.query(`UPDATE users SET ${changeClause} WHERE fb_id = ${fb_id}`);
}

export async function uploadAvatar (file, newName) {
    fs.rename(`${file}`, `assets/img/avatars/${newName}.jpg`, (err) => {
        if (err) throw err;
    });

    return true;
}

export async function blockUser (ingame_id) {
    //blocking user also removes all comments
    await mysql.remove(`comments`, `fb_id = ${ingame_id}`);
    return await mysql.update(`users`, `role = -1`, `fb_id = ${ingame_id}`);
}