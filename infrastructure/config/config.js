"use strict";
// import dotenv from 'dotenv';
// dotenv.config();

const dotenv = require('dotenv');

dotenv.config();
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
    url: process.env.DB_URL || '',
    dialect,
    logging: e => {
      console.log(e);
    }
  }
};
