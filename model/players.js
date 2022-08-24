const {Sequelize} = require("sequelize");
const sequelize = require('../db');

const Players = sequelize.define("players", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true,
  }, 
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isManager: {
    type: Sequelize.INTEGER,
    defaultValue:0
  }
},
{
  timestamps:false,
  freezeTableName: true
});

module.exports = Players;