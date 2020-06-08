const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const sessionConfig = {
  name: 'Cookies',
  secret: 'sssh secret',
  cookie: {
    maxAge: 1000 * 20,
    secure: false, //do true in production
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require('../data/dbConfig'),
    tableName: 'session',
    sidFieldName: 'sid',
    createTable: true,
    clearInterval: 1000 * 20,
  }),
};

const usersRouter = require('../users/users-router');
const AuthRouter = require('../auth/auth-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use('/api/users', usersRouter);
server.use('/api/auth', AuthRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: 'API is up!' });
});

module.exports = server;
