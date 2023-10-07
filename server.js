
const express = require('express');
const session = require('express-session');
const userMiddleware = require('./middlewares/userMiddleware');
const bodyParser = require('body-parser');
const bodySanitizer = require('./middlewares/bodySanitizer');
const path = require('path');
const cors = require('cors');
const router = require('./router');
const app = express();

app.use(cors());

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodySanitizer);
app.use(session({
    saveUninitialized: false,
    resave: true,
    secret: 'Un super secret',
}));

app.use(userMiddleware);
app.use(router);
app.use('/IMG', express.static(path.join(__dirname, 'IMG')));
app.listen(5000,
    ()=>{console.log('connexion au serveur : ok')})
