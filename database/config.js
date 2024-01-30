const mysql = require('mysql2');
const db = mysql.createConnection({                     // datos de conexion con la base de datos
    host: 'localhost',
    user: 'root',
    database: 'municipalidad'
});

module.exports = db;