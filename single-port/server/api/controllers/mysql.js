import mysql from 'mysql2/promise';
import config from '../../config/index.js';

const auth = config.database
var connect = _ => mysql.createConnection(auth);

export async function query (query) {
    const connection = await connect();
    const [rows, fields] = await connection.execute(query)
    connection.end();
    
    return rows;
};

// export async function insert (table, rowNames, rowValue) {
//     const connection = await mysql_controller.connection();
//     const [results] = await connection.execute(`INSERT INTO ${table} (${rowNames}) VALUES (${rowValue})`);
//     connection.end();

//     return results.insertId;
// }

// export async function update (table, changingRows, condition) {
//     //example mysql.update("images", "tags = 'mania'", "id = 12332")
//     await query(`UPDATE ${table} SET ${changingRows} WHERE ${condition}`);
// }

// export async function remove (table, condition) {
//     //example mysql.delete("images", "id = 12332")
//     await mysql_controller.query(`DELETE FROM ${table} WHERE ${condition}`);
// }

/*
    STRUCTURE:
        Table: Images
            ID - INT
            Author_ID - INT
            Added_in - Date
            Name - Text
            Tags - Text
            Likes - INT
            Status = integer
            author_id = integer

        Table: Users
            ID - INT
            Ingame_ID - INT
            Registered - DATE
            SumLikes - INT
            SumDislikes - INT
            Role - INT

        Table: Likes
            ID - int
            MEME_ID - integer
            ingame_id - integer
*/
