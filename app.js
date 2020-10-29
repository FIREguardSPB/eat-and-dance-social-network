const express = require("express");
const useMiddleware = require("./middleware");
const indexRouter = require("./routes/index");
const danceRouter = require('./routes/dance')
const foodRouter = require('./routes/food')
const useErrorHandlers = require("./middleware/error-handlers");
const authRouter = require('./routes/auth')

require('./temp/userseeder')()
const app = express();
useMiddleware(app);

// Подключаем импортированные маршруты с определенным url префиксом.
app.use("/", indexRouter);
app.use('/auth',authRouter)
app.use('/dance', danceRouter)
app.use('/food', foodRouter)

useErrorHandlers(app);

module.exports = app;
