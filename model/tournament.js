const {Sequelize} = require("sequelize");
const sequelize = require('../db');

const Tournament = sequelize.define("tournament", {
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
  maxNoOfTeamsAllowed: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  startDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  endDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gameName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  teamName:{
    type: Sequelize.STRING,
    allowNull: false,
  }
},
{
  timestamps:false,
  freezeTableName: true
});

module.exports = Tournament;