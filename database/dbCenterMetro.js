//Here all for the DB connection
const mysql = require('mysql');

const connectionAlarmasmetro = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_ALARMASMETRO
});

connectionAlarmasmetro.connect((error)=>{
    //catch el error
    if(error){
        console.log('Error Conection connectionAlarmasmetro: ' + error);
        return;
    }
    console.log('conection succesfully connectionAlarmasmetro');
});



module.exports = connectionAlarmasmetro;