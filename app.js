const express = require("express");
const useMiddleware = require("./middleware");
const indexRouter = require("./routes/index");
const useErrorHandlers = require("./middleware/error-handlers");
const authRouter = require('./routes/auth')

const app = express();
useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use("/", indexRouter);
app.use('/auth',authRouter)

useErrorHandlers(app);

module.exports = app;
