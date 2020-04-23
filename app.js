const express = require('express');
const useMiddleware = require('./middleware/index');
const useErrorHandlers = require('./middleware/error-handlers');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();
useMiddleware(app);

app.use('/', indexRouter);
app.use('/auth', authRouter);

useErrorHandlers(app);

module.exports = app;
