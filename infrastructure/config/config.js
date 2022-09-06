"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _dotenv = require("dotenv");

(0, _dotenv.config)();
const dialect = process.env.DIALECT || 'postgres';
module.exports = {
  development: {
    url: process.env.DB_URL || '',
    dialect,
    logging: e => {
      console.log(e);
    }
  },
  test: {
    dialect: 'sqlite',
    storage: _path.default.join(__dirname, '..', 'database_test.sqlite3'),
    logging: e => {
      console.log(e);
    }
  },
  production: {
    url: process.env.DB_URL || '',
    logging: false,
    pool: {
      acquire: 1000000
    }
  }
};