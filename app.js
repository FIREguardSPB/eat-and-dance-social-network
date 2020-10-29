const express = require("express");
const useMiddleware = require("./middleware");
const indexRouter = require("./routes/index");
const useErrorHandlers = require("./middleware/error-handlers");

const app = express();
useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use("/", indexRouter);

useErrorHandlers(app);

module.exports = app;



const mongoose = require('mongoose')
const path = require('path')
const logger = require('morgan')


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true})) // req.body = undefined
app.use(logger('dev'))


