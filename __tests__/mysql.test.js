//routes.test.js
const request = require('supertest');
const server = require('../app.js');
const mysql = require('../controllers/mysql_controller');

beforeAll(async () => {
    // do something before anything else runs
    console.log('Jest starting!');
});

afterAll(() => {
    // close the server after each test
    server.close();
    console.log('Server closed!');
}); 


describe('Mysql tests', () => {
    test('Is the MySQL connection done properly? ', async () => {
        const response = await mysql.connection();
        expect(response.connection.authorized).toBe(true);
    });

    test('Are the tables in database proper? ', async () => {
        const actualTables = ['images', 'users'];
        const incomingTable = [];
        const response = await mysql.query('SHOW TABLES');
        
        for(table of response){
            incomingTable.push(table.Tables_in_memepage)
            //remember to change the TABLES IN MEMEPAGE if you change 
            //the database name ;)
        }

        expect(incomingTable).toEqual(expect.arrayContaining(actualTables));
    })
});
