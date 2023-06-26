//configuracion dotenv para la implementación de las variables de entorno
require('dotenv').config();

const initModel = require('./models/initModels');

//! este paso es posterior y complementarior a este: hacer la conexión y sincronización en el server
const { db } = require('./database/config');

//importacion del app
const app = require('./app');

//autenticación
db.authenticate()
  .then(() => console.log('Database authenticated ✌'))
  .catch((err) => console.log(err));

initModel();

//sincronización
db.sync()
  .then(() => console.log('Database Synced 👏'))
  .catch((err) => console.log(err));

//metodo listen
const PORT = process.env.PORT; // process es una variable en la que tengo acceso a todo el entorno de node

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 😎 ...`);
});

//se crea el script para ejecutar la aplicación adicionando en el package.json el comando: "start:dev": "nodemon src/server.js"

//?luego se configura el archivo: config.js con lo siguiente

//se crea una base de datos (esto se hace en el simbolo del sistema(cmd) se le da el comando), y se le pone el nombre de la base de datos

//configurar la base de datos en su carpeta database

//hacer la conexión y sincronización en el server
