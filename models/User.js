const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
  'user',
  {
    id:{
      type: Sequelize.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    full_name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    token:{
        type: Sequelize.STRING,
        allowNull: true
    },
    enabled:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
  },
  {
    timestamps: false
  }
)
