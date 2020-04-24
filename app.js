const express = require('express');
const useMiddleware = require('./middleware/index');
const useErrorHandlers = require('./middleware/error-handlers');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const chatRouter = require('./routes/chat');


const app = express();
useMiddleware(app);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/chat', chatRouter);

useErrorHandlers(app);

module.exports = app;
