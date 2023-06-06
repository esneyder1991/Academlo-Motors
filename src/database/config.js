const { Sequelize } = require('sequelize'); //importación de sequelize

//se establece la conexión

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'root',
  database: 'dbacademlomotor',
  port: 5432,
  logging: false,
});

module.exports = { db };

// const db = new Sequelize({
//   dialect: 'postgres', //es el motor de base de datos que estoy utilizando
//   host: 'localhost', //la dirección IP o DNS de mi servidor(opcional: 127.0.0.1)
//   username: 'postgres', //Nombre de usuario que por defecto es postgres
//   password: 'root', //contraseña establecida durante la configuración del servicio
//   database: 'dbacademlomotor', //nombre que se le pone a la bd durante su creación en el simbolo del sistema (CMD)
//   port: 5432, // puerto por donde se conecta con la base de datos
//   logging: false, // para que no nos muestre por terminal cada actualización que se le realice a la base de datos
// });
