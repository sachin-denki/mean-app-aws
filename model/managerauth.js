const {Sequelize} = require("sequelize");
const sequelize = require('../db');

const ManagerAuth = sequelize.define("managerauth", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true,
  },
  managerid: {
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

module.exports = ManagerAuth;