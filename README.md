# Пример авторизации с использованием Passport.js и GitHub

1. Подключаем приложение на GitHub
- Документация [Passport.js](http://www.passportjs.org/docs/authenticate/)
- На странице https://github.com/settings/developers создаём новое приложение (потребуется получить Client id и Client secret). В поле `Homepage URL` указываем "http://127.0.0.1", в поле `Authorization callback URL` указываем "http://127.0.0.1/auth/github/callback"

2. Запускаем приложение с указанием переменных окружений:
```
GITHUB_CLIENT_ID=X GITHUB_CLIENT_SECRET=Y EXPRESS_SESSION_SECRET=Z npm start
```

где:  
`GITHUB_CLIENT_ID` - ID полученный на этапе регистрации приложения в Github  
`GITHUB_CLIENT_SECRET` - секрет полученный на этапе регистрации приложения в Github  
`EXPRESS_SESSION_SECRET` - случайно сгенерированная строка, используется для подписывания сессионной куки  

Открываем приложение  
http://127.0.0.1:3000/
