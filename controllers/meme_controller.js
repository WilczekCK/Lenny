const mysql = require('../controllers/mysql_controller');
const fs = require('fs')

var meme_controller = meme_controller || {}
meme_controller = {
    displayMemes: async _ => {
        const memesRecord = await mysql.query(`SELECT id FROM images ORDER BY 'added_in' DESC`);
        return memesRecord;
    },
    insertToDB: async (author_id, date, tags) => {
        const uploadedSqlID = await mysql.insert(`images`, `author_id, added_in, tags`, `${author_id}, '${date}', '${tags}'`);
        return uploadedSqlID;
    },
    changeImageName: async (oldName, newName) => {
        fs.rename(`./public/uploads/${oldName}`, `./public/uploads/${newName}.jpg`, (err) => {
            if (err) throw err;
        });
    }
}


module.exports = meme_controller || 'There is a problem with a meme controller file';