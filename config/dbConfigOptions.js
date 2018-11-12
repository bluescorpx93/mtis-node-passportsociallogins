var typeorm = require('typeorm');
var EntitySchema = typeorm.EntitySchema;
var User = require('../models/user');
var appKeys = require("../keys/appKeys");

const dbConfigOptions = {
  type:     appKeys.DB_TYPE,
  host:     appKeys.DB_HOST,
  port:     appKeys.DB_PORT,
  username: appKeys.DB_USER,
  password: appKeys.DB_PASS,
  database: appKeys.DB_NAME,
  synchronize:  true,
  entities: [
    new EntitySchema(User)
  ]
}

module.exports = dbConfigOptions
