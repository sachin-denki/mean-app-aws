const {Sequelize} = require("sequelize");
const sequelize = require('../db');

const Team = sequelize.define("team", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true,
  }, 
  teamName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  maxNoOfPlayersAllowed: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tournamentName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  players: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  teamCreator:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  teamCreatorID:{
    type: Sequelize.STRING,
    allowNull: false,
  }
},
{
  timestamps:false,
  freezeTableName: true
});

module.exports = Team;