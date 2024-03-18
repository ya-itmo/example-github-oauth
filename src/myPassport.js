const myPassport = require('passport');
const { githubStrategy } = require('./strategies/github');

// Подключаем созданную стратегию
myPassport.use(githubStrategy);

// Определяем функцию для сохранения данных пользователя в сессию
myPassport.serializeUser((profile, done) => {
    // Мы можем сохранить целиком
    done(null, profile);

    // Или, например, только id из базы:
    //
    // done(null, profile.id);
});

// Определяем функцию для получения данных пользователя из сессии
myPassport.deserializeUser((profile, done) => {
    // Мы сохранили целиком, поэтому данные уже готовы
    done(null, profile);

    // Если бы мы сохранили только id пользователя,
    // то понадобилось бы в начале сходить в базу:
    //
    // User.findById(id, (err, profile) => {
    //     done(err, profile);
    // });
});

module.exports = { myPassport };