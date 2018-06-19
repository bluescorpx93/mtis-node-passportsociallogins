var typeorm = require('typeorm');
var EntitySchema = typeorm.EntitySchema;
var User = require('../models/user');
var dbConnection = "";

const dbConfigOptions = {
  type:     `${process.env.DB_TYPE}`,
  host:     `${process.env.DB_HOST}`,
  port:     `${process.env.DB_PORT}`,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASS}`,
  database: `${process.env.DB_NAME}`,
  synchronize:  true,
  entities: [
    new EntitySchema(User)
  ]
}

module.exports = dbConfigOptions
