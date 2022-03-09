
const express = require('express');
const session = require('express-session');
const userMiddleware = require('./middlewares/userMiddleware');
//je vais chercher mon fichier .env où je stocke mes données sensibles
require('dotenv').config({path: './config/.env'});
const bodyParser = require('body-parser');
const bodySanitizer = require('./middlewares/bodySanitizer');
const path = require('path');
const cors = require('cors');
const router = require('./router');
const app = express();

app.use(cors({
    origin:'http://localhost:8080'
}));

//le serveur est lancée sur le port 5000 et avec un callback qui me fait un retour en console.
//utilisation de la variable d'env.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodySanitizer);
app.use(session({
    saveUninitialized: false,
    resave: true,
    secret: 'Un super secret',
}));

app.use(userMiddleware);
app.use(router);
app.use('/IMG', express.static(path.join(__dirname, 'IMG')));
app.listen(process.env.PORT, 
    ()=>{console.log('connexion au serveur : ok')})