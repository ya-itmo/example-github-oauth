const express = require('express');
const passport = require('passport');
const {isAuthenticatedMiddleware} = require('./middlewares/isAuthenticatedMiddleware');

const routers = express.Router();

// Главная страница
routers.get(
    '/',
    (req, res) => res.render('home', { user: req.user })
);

// Маршрут для входа
routers.get(
    '/auth/github',
    // Аутентифицируем пользователя через стратегию GitHub
    // Если не удается, отправляем код 401
    passport.authenticate('github')
);

// Маршрут, на который пользователь будет возвращён после авторизации на GitHub
routers.get(
    '/auth/github/callback',
    // Заканчиваем аутентифицировать пользователя
    // Если не удачно, то отправляем на /
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => res.redirect('/')
);

// Маршрут для просмотра профиля пользователя
routers.get(
    '/profile',
    // Если пользователь не аутентифицирован, то отправляем на /
    isAuthenticatedMiddleware,
    // Иначе показываем его профиль
    (req, res) => res.render('user', { user: req.user })
);

// Маршрут для выхода пользователя
routers.get(
    '/logout',
    (req, res) => {
        // Удаляем сессию пользователя из хранилища
        req.logout(function(err) {
            if (err) { return next(err); }
            // И отправляем на /
            res.redirect('/');
        });
    }
);

module.exports = { routers }