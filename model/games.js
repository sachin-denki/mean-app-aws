const {Sequelize} = require("sequelize");
const sequelize = require('../db');

const Games = sequelize.define("games", {
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
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  }
},
{
  timestamps:false,
  freezeTableName: true
});


module.exports = Games;