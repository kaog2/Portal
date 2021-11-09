//Here all for the DB connection
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((error)=>{
    //catch el error
    if(error){
        console.log('Error Conection: ' + error);
        return;
    }
    console.log('conection succesfully');
});

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

module.exports = connection;