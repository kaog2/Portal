//Here all for the DB connection
const mysql = require('mysql2');

const connectionAlarmasnorte = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_ALARMASNORTE
});

connectionAlarmasnorte.connect((error)=>{
    //catch el error
    if(error){
        console.log('Error Conection connectionAlarmasnorte: ' + error);
        return;
    }
    console.log('conection succesfully connectionAlarmasnorte');
});

module.exports = connectionAlarmasnorte;