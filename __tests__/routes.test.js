//routes.test.js
const request = require('supertest');
const server = require('../app.js');

beforeAll(async () => {
    // do something before anything else runs
    console.log('Jest starting!');
});

afterAll(() => {
    // close the server after each test
    server.close();
    console.log('Server closed!');
}); 

describe('Route tests', () => {
    test('Is main route available?  "/" ', async () => {
        const response = await request(server).get('/');
        expect(response.status).toEqual(200);
    });

    test('Is login route available?  "/login" ', async () => {
        const response = await request(server).get('/login');
        expect(response.status).toEqual(200);
    });

    test('Is adding meme route available?  "/newMeme" ', async () => {
        const response = await request(server).get('/newMeme');
        expect(response.status).toEqual(200);
    });
});