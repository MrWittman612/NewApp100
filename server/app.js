var express = require('express');
var path = require('path');
var logger = require('morgan');
var { login, register, protectedRoute } = require('./api/auth');
var usersRouter = require('./api/users/users.router');
var connectMongoDB = require('./hoc/connectMongoDB');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectMongoDB();

app.post('/api/login', login);
app.post('/api/register', register);
app.use('/api/users', protectedRoute, usersRouter);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  const staticFiles = express.static(
    path.join(__dirname, '../../client/build')
  );
  app.use(staticFiles);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
  });
}

module.exports = app;
