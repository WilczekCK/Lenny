const mysql = require('../controllers/mysql_controller');
const user = require('../controllers/user_controller');
const _ = require('underscore');
module.exports = ({ profileRoute }) => {
    profileRoute.get('/', async (ctx, next) => {
        await ctx.throw(400, 'Missing the ID of profile!')
    });

    profileRoute.get('/:id', async (ctx, next) => {
        const idToFind = ctx.params.id;
        const userInfo = user.find(idToFind);

        if(!userInfo) ctx.throw(404, 'There is no user with ID like that')
        else ctx.render('profile', userInfo)
    })
}

