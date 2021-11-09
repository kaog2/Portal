//Here all for the DB connection
const mysql = require('mysql');

const connectionAlarmas = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_ALARMAS
});

connectionAlarmas.connect((error)=>{
    //catch el error
    if(error){
        console.log('Error Conection connectionAlarmas: ' + error);
        return;
    }
    console.log('conection succesfully connectionAlarmas');
});

module.exports = connectionAlarmas;
