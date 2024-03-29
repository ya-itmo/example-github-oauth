const cookieParser = require('cookie-parser');
const express = require('express');
const expressSession = require('express-session');

const { routers } = require('./routes');
const { myPassport } = require('./myPassport');

const app = express();

// Подключаем шаблонизатор handlebars (https://handlebarsjs.com/)
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Подключаем библиотеку для парсинга кук, чтобы получить доступ к сессионной куке
app.use(cookieParser());

// Подключаем библиотеку, чтобы управлять сессиями аутентифицированных пользователей.
app.use(expressSession({
    // Сессии содержат id сессии и данные пользователя
    // (или id пользователя, если данные хранятся в базе).
    //
    // Как только пользователь аутентифицируется, мы создаём его сессию с уникальным id.
    // кладём её в хранилище (по умолчанию, в память), связываем с данными пользователя.
    //
    // Затем подписываем сессию секретом и кладём в cookie `connect.sid`.
    //
    // При обновлении страницы, мы читаем cookie `connect.sid`,
    // получаем из неё id и смотрим, нет ли в хранилище существующей сессии.
    //
    // Если есть, то считаем пользователя уже аутентифицированным.

    // Секрет, для подписи сессионной cookie, чтобы её нельзя было подделать
    secret: process.env.EXPRESS_SESSION_SECRET,
    // Указываем, нужно ли сохранять сессию, даже если она не была изменена
    resave: false,
    // Указываем, нужно ли сохранять новую, но не измененную сессию
    saveUninitialized: false,
    // Указываем хранилище (по умолчанию, в памяти)
    // store: new require('connect-mongo')(expressSession)(options)
}));

app.use(myPassport.initialize());

// Подключаем механизм сессий к Passport.js
app.use(myPassport.session());

app.use(routers);

app.listen(3000);
