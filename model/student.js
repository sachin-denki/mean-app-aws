const {Sequelize} = require("sequelize");
const sequelize = require('../db');

const Student = sequelize.define("student", {
  
  id: {
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey:true,
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  studentData: {
    type: Sequelize.JSON,
    allowNull: false,
  }
}, 
{
  freezeTableName: true,
  timestamps:false
});

module.exports = Student;