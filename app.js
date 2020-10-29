const express = require("express");
const useMiddleware = require("./middleware");
const indexRouter = require("./routes/index");
const useErrorHandlers = require("./middleware/error-handlers");
require('./temp/userseeder')()
const app = express();
useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use("/", indexRouter);

useErrorHandlers(app);

module.exports = app;
