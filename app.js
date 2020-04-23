const express = require('express');
const useMiddleware = require('./middleware/index');
const useErrorHandlers = require('./middleware/error-handlers');
const indexRouter = require('./routes/index');

const app = express();
useMiddleware(app);

app.use('/', indexRouter);

useErrorHandlers(app);

module.exports = app;
