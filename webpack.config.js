const path = require("path"); // утилита, которая превращает относительный путь в абсолютный.
//  Она называется path, а подключить его в файл можно функцией require
const HtmlWebpackPlugin = require("html-webpack-plugin"); // подключие плагин html-webpack-plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // подключие плагина clean-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //подключите к проекту mini-css-extract-plugin

// require — это как import только в Node.js.
// Опять же, такое подключение файла мы будем использовать только в конфиге «Вебпака», потому что этот файл запускается в Node.js.
// Во всех остальных файлах мы по-прежнему будем пользоваться директивой import.

// Переменная __dirname в Node.js доступна глобально.
// В ней хранится абсолютный путь до папки, в которой лежит файл, где мы используем эту переменную.
//  В нашем случае абсолютный путь до папки с конфигом «Вебпака» — корневой папки нашего проекта.

module.exports = {
  entry: { main: "./src/scripts/index.js"}, //Точка входа — объект entry. Ему нужно прописать путь к точке входа в свойстве main
  output: {
    // точка выхода output
    path: path.resolve(__dirname, "dist"), // путь к точке выхода
    filename: "main.js", // имя файла, куда Webpack положит код
    publicPath: "", // свойство для обновления путей внутри CSS- и HTML-файлов
  },
  mode: "development", // добавим настройки локального сервера
  devServer: {
    static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

    open: true, // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [
      // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: "babel-loader",
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: "/node_modules/",
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // вызываем CleanWebpackPlugin для очищения директории dist
    new MiniCssExtractPlugin(),
  ],
};



