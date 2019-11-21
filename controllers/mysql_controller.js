const mysql = require('koa-mysql');

var mysql_controller = mysql_controller || {}
mysql_controller = {
    connect: function(){
        console.log('connected!');
    }
}

module.exports = mysql_controller || 'There is a problem with a MySQL controller file';