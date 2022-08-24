const {Sequelize} = require("sequelize");
const sequelize = require('../db');

const PlayerAuth = sequelize.define("Playerauth", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true,
  },
  playerid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
    // allowNull: false,
  }
},
{
  timestamps:false,
  freezeTableName: true
});

module.exports = PlayerAuth;