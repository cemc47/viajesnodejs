// importar express
const express = require('express');
const path  = require('path'); 
const bobyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');
require('dotenv').config({path: 'variables.env'}); // sirve para trabajar con variables de entorno

/*
db.authenticate()
.then(()=> {
    console.log('DB conectada');
})
.catch( error => console.log(error) );
*/
// configurar express
const app = express();

// habilitar pug
app.set('view engine', 'pug');

// anadir las vistas
app.set('views', path.join(__dirname + '/views/'));

//cargar carpeta statica llamada public
app.use(express.static('public'));


// validar ambiente
const config = configs[app.get('env')];

//creamos variable para sitio web
app.locals.titulo = config.nombresitio;

//muestra el año actual y genera la ruta
app.use((req, res, next)=>{
    // crear fecha
    const fecha = new Date();

    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    
    return next();
})

// ejecutar el bobyParser
app.use(bobyParser.urlencoded({extended: true}))

// cargar rutas
app.use('/', routes()); // se usa use porque este interpreta todos los metodos get put post delete

/** puerto y host para la app, en heroku cuando encuentre 0.0.0.0 le asignara una, esto en la version gratis */
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4747;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando.');
    
});