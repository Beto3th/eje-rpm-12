//Para establecer la conexion a mysql
//Desestructurar = Solo lo que requerimos 
const {createPool} = require('mysql2/promise');


//Opciones para la conexion a la base de datos
const conexion = createPool({
    host : process.env.MYSQLHOST || 'localhost',
    user : process.env.MYSQLUSER || 'root',
    password : process.env.MYSQLPASSWORD || '',
    port : process.env.MYSQLPORT || '3306',
    database : process.env.MYSQLDATABASE || 'siveo'
})

//Funcion que nos regrese la conexio
const getConexion = ()=>{
    return conexion;
}

//Exportamos la funcion para poder usarla en otros modulos (archivo.js)
module.exports.miConexion = getConexion;