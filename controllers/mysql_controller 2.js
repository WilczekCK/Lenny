const mysql = require('mysql2/promise');

var mysql_controller = mysql_controller || {}
mysql_controller = {
    auth: {
        user: 'root',
        password: 'rootpass',
        database: 'memePage',
        host: 'localhost'
    },
    connection: _ => mysql.createConnection(mysql_controller.auth),
    query: async (query) => {
        const connection = await mysql_controller.connection();
        
        const [rows, fields] = await connection.execute(query)
        connection.end();
        return ([rows]);
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
            Dislikes - INT

        Table: Users
            ID - INT
            Ingame_ID - INT
            Registered - DATE
            SumLikes - INT
            SumDislikes - INT
            Role - INT
*/

module.exports = mysql_controller || 'There is a problem with a MySQL controller file';