'use strict';
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const config = require('./server-config');

const app = express();

mongoose.connect(config.mongo.uri, { useMongoClient: true });

mongoose.connection.on('connected', () => {
    console.log(`Connected to database`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Database Error: ${err}`);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

// api routes
<% for (let entity of entities) { %>
const <%=_.camelCase(entity.name) %> = require('./server/api/<%= _.kebabCase(entity.name) %>');
<% } %>
<% for (let entity of entities) { %>
app.use('/api/<%= _.camelCase(entity.name) %>s', <%= _.camelCase(entity.name) %>);
<% } %>

app.get('*', (req, res) => {
  res.send(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: 'error'});
});

module.exports = app;
