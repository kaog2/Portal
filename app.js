//var dataSouth = [];

//Main Library (Framework)- invoque express 
const express = require('express');
const app = express();

// set urlencode to get data from forms 
//and to not have errors 
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//invoque a dotenv .. for enviroment variable 
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

// public directory
app.use('/resource',express.static('public'));
app.use('/resource', express.static(__dirname + '/public'));

app.use('/SpryAssets',express.static('SpryAssets'));
app.use('/SpryAssets', express.static(__dirname + '/SpryAssets'));

// Templates
app.set('view engine', 'ejs');

// invoque bcryptjs
const bcryptjs = require('bcryptjs');

const url = require('url');

//Session variable
const session = require('express-session');
app.use(session({
    secret: 'secret', //clave secreta
    resave: true,//forma en que se guardan las sesionen
    saveUninitialized: true
}))

//invoque conection module for DB

const connection = require('./database/db');
const connectionAlarmas = require('./database/dbSouth');
const connectionAlarmasmetro = require('./database/dbCenterMetro');
const connectionAlarmasnorte = require('./database/dbNorth');

//for templates
const { resolveInclude } = require('ejs');

//console.log(__dirname);

/*app.get('/', (req, res) =>{
    //res.render('index');
    //send parameter
    res.render('index', {msg: "this is a paramater from app.js"});
    //res.send('HOLA MUNDO');
})*/

app.get('/login', (req, res) =>{
    res.render('login');
    //res.send('HOLA MUNDO');
})

//first page before login
app.get('/ResumenR2', (req, res) =>{

    if(req.session.loggedin){

        connectionAlarmas.query("SELECT * FROM tabla", async (error, rowsSouth)=>{
            if(error){
                console.log(error);
                return; 
            }else{

                connectionAlarmasmetro.query("SELECT * FROM tabla", async (error, rowsCenter)=>{
                    if(error){
                        console.log(error);
                        return; 
                    }else{
                        
                        connectionAlarmasnorte.query("SELECT * FROM tabla", async (error, rowsNorth)=>{
                            if(error){
                                console.log(error);
                                return; 
                            }else{
                                //console.log(rowsSouth);
                               // console.log(req.session.allowAccessArea);
                                connection.query("SELECT * FROM perfil WHERE perfil = ?", [req.session.allowAccessArea], async (error, rowsPerfil)=>{
                                    if(error){
                                        console.log(error);
                                        return; 
                                    }else{
                                        //console.log(JSON.stringify(rowsPerfil));
                                        //send parameter to ResumenR2
                                        res.render('ResumenR2',{resultSouth : rowsSouth, resultCenter : rowsCenter, resultNorth : rowsNorth,
                                                                resultPerfil : rowsPerfil, area : req.session.allowAccessArea,
                                                                username : req.session.name
                                                    });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        
    }else{
        res.render('index',{
            login:false,
            name:'Debe iniciar sesion'
        })
    }
})

app.get('/ResumenB', (req, res) =>{

    var requrl = req.protocol +"://" + req.get('host') + req.originalUrl;

    var paramUrl = new URL(requrl);
    var area = paramUrl.searchParams.get("area");
    console.log(requrl);
    console.log(area);
    console.log(req.protocol +"://" + req.get('host') + req.originalUrl);
    
    res.send('HOLA MUNDO');
})


app.post('/auth',async (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;

    let passHash = await bcryptjs.hash(pass,8);

    if(user && pass){
        connection.query("SELECT * FROM datos WHERE Username = ? AND Password = ?", [user,pass], async (error, result)=>{

            if(result.length == 0 ){
                res.render('login',{
                    alert:true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o password incorrectas",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer:2000,
                    ruta:'login'
                });

            }else{
                //here you can do your own variables into req.session
                req.session.loggedin = true;
                req.session.name = result[0].Username;
                req.session.allowAccessArea = result[0].at;
                
                res.render('login',{
                    alert:true,
                    alertTitle: "Conexion exitosa",
                    alertMessage: "Conexion exitosa!",
                    alertIcon: "success",
                    showConfirmButton: true,
                    timer:1500,
                    ruta:'ResumenR2'
                });
            }

        } );
    }else{
        res.render('login',{
            alert:true,
            alertTitle: "Advertencia",
            alertMessage: "Por favor ingrese un usuario",
            alertIcon: "warning",
            showConfirmButton: true,
            timer:1500,
            ruta:'login'
        });
    }
})


// Auth pages
app.get('/', (req, res)=>{
    if(req.session.loggedin){
        res.render('index',{
            login:true,
            name: req.session.name
        });
    }else{
        res.render('index',{
            login:false,
            name:'Debe iniciar sesion'
        })
    }
})
//Listening the server on port 3000
app.listen(3000,(req, res) =>{
    console.log('SERVER RUNNING IN http://localhost:3000')
})