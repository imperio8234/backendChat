const mysql = require('mysql2');
require('dotenv').config();

const HOST = process.env.DB_HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const NAME = process.env.DB_NAME;
const PORT = process.env.DB_PORT;

const conexion = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  port: PORT,
  database: NAME
})


conexion.connect((err => {
    if (err) {
        console.log('error en la conexion a base de datos', err)
    } else {
        console.log("conexion a base de datos exitosa")
    }
}));


module.exports = conexion