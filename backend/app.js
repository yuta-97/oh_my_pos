const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const history = require('connect-history-api-fallback');
require('dotenv').config();

const connect = require('./model');

const indexRouter = require('./routes/index');
const todoRouter = require('./routes/todo');

const app = express();

connect(); // DB 실행

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); 

app.use('/api/todos', todoRouter);
app.use(history());
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get('port'), () => {
  console.log(`서버가 ${app.get('port')}번 포트에서 정상적으로 작동합니다.`);
});