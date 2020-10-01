import _ from 'underscore';
import fs from 'fs';
import * as mysql from './mysql.js';

export async function displayMemes (limit) {
    if(limit) limit = `limit ${limit}`
    else limit = '';
    
    const memesRecord = await mysql.query(`SELECT *, (select count(*) from comments where images.id = comments.meme_id) AS comments_sum, (select username from users where fb_id = author_id) AS author_username FROM images WHERE status = 1 ORDER BY added_in DESC ${limit}`);

    //create array from simple string - for tags
    memesRecord.tagsDivider = createArrayFromTags(memesRecord);
    return memesRecord;
}

export async function displayMemesWithCategory (category, limit) {
    if(limit) limit = `limit ${limit}`
    else limit = '';
    

    const memesRecord = await mysql.query(`SELECT *, (select username from users where fb_id = author_id) AS author_username FROM images WHERE status = 1 AND concat(' ',tags,' ') like '% ${category} %' ORDER BY added_in DESC ${limit}`);
    //create array from simple string - for tags
    memesRecord.tagsDivider = createArrayFromTags(memesRecord);
    return memesRecord;
}

export async function displayMeme (id) {
    const memesRecord = await mysql.query(`SELECT id, (select username from users where fb_id = author_id) AS author_username, author_id, tags, likes, status, added_in, meme_title, video_id  FROM images WHERE id = ${id}`);
    //create array from simple string - for tags
    if(_.isEmpty(memesRecord)) return false;
    memesRecord.tagsDivider = createArrayFromTags(memesRecord);
    return memesRecord;
}

export async function displayMemesFromUser (user, limit) {
    const memesRecord = await mysql.query(`SELECT *, (select username from users where fb_id = author_id) AS author_username, (select count(*) from comments where images.id = comments.meme_id) AS comments_sum FROM images WHERE author_id = ${user} ORDER BY added_in DESC limit ${limit}`);
    if(_.isEmpty(memesRecord)) return false;
    memesRecord.tagsDivider = createArrayFromTags(memesRecord);
    return memesRecord;
}
 
export async function displayWaitingMemes (_) {
    const memesRecord = await mysql.query(`SELECT id, (select username from users where fb_id = author_id) AS author_username, author_id,  tags, likes, status, added_in, meme_title, video_id  FROM images WHERE status = 0 ORDER BY added_in DESC `);
    memesRecord.tagsDivider = createArrayFromTags(memesRecord);
    return memesRecord;
}
 
export async function createArrayFromTags (meme_tags) {
    meme_tags.forEach(mem => {
        if(mem.length == mem.length - 1) return 0;
        mem.tagsDivider = mem.tags.split(' ');
        mem.tagsDivider = _.without(mem.tagsDivider, ' ', '');
    })

    return meme_tags.tagsDivider
}

export async function insertToDB (author_id, author_username, date, tags, meme_title, meme_video_id) {
    const replacedTags = tags.replace(/,/g, " ");
    
    const uploadedSqlID = await mysql.insert(`images`, `author_id, author_username, added_in, tags, meme_title, video_id`, `${author_id}, '${author_username}' ,'${date}', '${_.escape(replacedTags)}', '${_.escape(meme_title)}', ${meme_video_id}`);
    return uploadedSqlID;
}

export async function uploadImage (file, newName) {
    fs.rename(`${file}`, `assets/img/uploads/${newName}.jpg`, (err) => {
        if (err) throw err;
    });

    return true;
}
    
export async function moderate (meme_id, decision)  {
    if(decision != 'Submit'){
        mysql.update(`images`, `status = -1`, `id = ${meme_id}`);
        fs.unlinkSync(`./public/uploads/${meme_id}.jpg`);
    }else{
        mysql.update(`images`, `status = 1`, `id = ${meme_id}`);
    }
}

export async function like (meme_id, who_liked) {
    let responseFromDB = await mysql.query(`SELECT id FROM likes WHERE fb_id = ${who_liked} AND meme_id = ${meme_id}`);
    if(!_.isEmpty(responseFromDB)) return true;

    mysql.insert(`likes`, `meme_id, fb_id`, `${meme_id}, ${who_liked}`);
    mysql.update(`images`, `likes = likes + 1`, `id = ${meme_id}`);
    return false;
}

export async function infiniteScroll (loadCount, loadElements) {
    const startFrom = (loadElements * loadCount);

    const memesRecord = await mysql.query(`SELECT *, (select username from users where fb_id = author_id) AS author_username, (select count(*) from comments where images.id = comments.meme_id) AS comments_sum FROM images WHERE status = 1 ORDER BY added_in DESC LIMIT ${loadElements} OFFSET ${startFrom}`)
    memesRecord.tagsDivider = createArrayFromTags(memesRecord);
        
    return memesRecord;
}

export async function infiniteScrollCategory (loadCount, loadElements, category) {
    const startFrom = (loadElements * loadCount);

    const memesRecord = await mysql.query(`SELECT id, (select username from users where fb_id = author_id) AS author_username, (select count(*) from comments where images.id = comments.meme_id), author_id, tags, likes, status, added_in, meme_title, video_id FROM images WHERE status = 1 AND concat(' ',tags,' ') like '% ${category} %' ORDER BY added_in DESC LIMIT ${loadElements} OFFSET ${startFrom}`)
    memesRecord.tagsDivider = createArrayFromTags(memesRecord);
        
    return memesRecord;
}

export async function infiniteScrollUser (loadCount, loadElements, user) {
    const startFrom = (loadElements * loadCount);
    const memesRecord = await mysql.query(`SELECT id, (select username from users where fb_id = author_id) AS author_username, (select count(*) from comments where images.id = comments.meme_id), author_id, tags, likes, status, added_in, meme_title, video_id FROM images WHERE status = 1 AND author_id = ${user} ORDER BY added_in DESC LIMIT ${loadElements} OFFSET ${startFrom}`)
    memesRecord.tagsDivider = createArrayFromTags(memesRecord);

    return memesRecord;
}

export async function getComments (meme_id) {
    const commentsMeme = await mysql.query(`SELECT comments.*, users.username, users.fb_id FROM comments, users WHERE meme_id=${meme_id} AND comments.fb_id = users.fb_id ORDER BY date DESC`);
    return commentsMeme;
}
    
export async function postComment (meme_id, fb_id, content, date) {
    await mysql.insert(`comments`, `meme_id, fb_id, content, date`, `${meme_id}, '${fb_id}', '${_.escape(content)}', '${date}'`);
    return true;
}
 
export async function removeComment (comment_id) {
    await mysql.remove(`comments`, `id = ${comment_id}`)
    return true;
}
