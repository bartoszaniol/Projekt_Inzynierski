const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const flash = require("connect-flash")

const mainRoute = require('./routes/main');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new SQLiteStore,
    secret: 'supersecretvaluekekw',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

app.use(mainRoute);

app.use(errorController.get404);

app.listen(3000);