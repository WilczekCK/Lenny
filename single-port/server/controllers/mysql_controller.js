const mysql = require('mysql2/promise');

var mysql_controller = mysql_controller || {}
mysql_controller = {
    auth: {
        user: 'root',
        password: 'rootpass',
        database: 'memepage',
        host: 'localhost'
    },
    connection: _ => mysql.createConnection(mysql_controller.auth),
    query: async (query) => {
        const connection = await mysql_controller.connection();
        
        const [rows, fields] = await connection.execute(query)
        connection.end();
        return rows;
    },
    insert: async (table, rowNames, rowValue) => {
        //example mysql.insert("images", "author_id, added_in, tags", "123123, '2019-02-01', 'std'");

        const connection = await mysql_controller.connection();
        const [results] = await connection.execute(`INSERT INTO ${table} (${rowNames}) VALUES (${rowValue})`);
        connection.end();

        return results.insertId;
    },
    update: async (table, changingRows, condition) => {
        //example mysql.update("images", "tags = 'mania'", "id = 12332")
        console.log(`UPDATE ${table} SET ${changingRows} WHERE ${condition}`)
        await mysql_controller.query(`UPDATE ${table} SET ${changingRows} WHERE ${condition}`);
    },
    delete: async (table, condition) => {
        //example mysql.delete("images", "id = 12332")
        await mysql_controller.query(`DELETE FROM ${table} WHERE ${condition}`);
    }
}


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

exports = mysql_controller || 'There is a problem with a MySQL controller file';