const { DataTypes } = require('sequelize'); //se importan los tipos de datos de sequelize dado que cada atributo de la base de dato va a ser de un tipo de dato diferente es decir: STRING, INTEGER(# entero), FLOAT(# decimal), etc.

const { db } = require('./../database/config'); //importamos la configuración de la base de datos

//se crea una constante que va a contener el modelo dentro de la cual se define de la siguiente manera:
const Repair = db.define('repairs', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  motorsNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

//Finalmente se exporta

module.exports = Repair;
