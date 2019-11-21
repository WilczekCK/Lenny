//routes.test.js
const request = require('supertest');
const server = require('../app.js');
const fs = require('fs');

beforeAll(async () => {
    // do something before anything else runs
    console.log('Jest starting!');
});

afterAll(() => {
    // close the server after each test
    server.close();
    console.log('Server closed!');
}); 

describe('Style tests', () => {
    test('Is main SCSS file there?  "/" ', async () => {
        const response = await fs.existsSync('public/scss/main.scss')
        expect(response).toBe(true);
    });

    test('Is CSS compiled ?  "/" ', async () => {
        const response = await fs.existsSync('public/css/main.css')
        expect(response).toBe(true);
    });
});