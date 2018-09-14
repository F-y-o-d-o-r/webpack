"devDependencies": файлы нужны при сборке --save-dev or -D
  "dependencies": файлы нужны в итоговом коде --save

  "build": "webpack --mode production" // ore development - faster

  npm run dev / build

  extract-text-webpack-plugin@next

  url loader - просто переносит без изменений файлы
  polifill

****************************
https://tproger.ru/translations/configure-webpack4/
Вы легко можете переопределять значения по умолчанию в скриптах npm, просто используя флаги:
"scripts": {
   "dev": "webpack --mode development ./src/index.js --output ./dist/main.js",
   "build": "webpack --mode production ./src/index.js --output ./dist/main.js"
}
Это перепишет опции по умолчанию без каких-либо других настроек.
****************************
В качестве упражнения попробуйте также флаги:
    флаг наблюдения watch для включения режима просмотра. Он будет следить за изменениями вашего файла и компилировать всякий раз при его изменении:
"scripts": {
   "dev": "webpack --mode development ./src/index.js --output ./dist/main.js --watch",
   "build": "webpack --mode production ./src/index.js --output ./dist/main.js --watch"
}
    флаг входа. Работает так же, как и выход, но перезаписывает точку входа.
****************************

