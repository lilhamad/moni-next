const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
console.log("🚀 ~ env", env)
const config = require(`${__dirname}/../config/config.js`)[env];
console.log("🚀 ~ config", config)
const db = {};
const User = require('./user');
const Wallet = require('./wallet');
const Credential = require('./credential');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User(sequelize, Sequelize); 
db.Wallet = Wallet(sequelize, Sequelize); 
db.Credential = Credential(sequelize, Sequelize); 

module.exports = db;
