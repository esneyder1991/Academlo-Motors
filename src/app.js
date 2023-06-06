const cors = require('cors'); //importación de cors
const express = require('express'); //importación de express

const app = express(); //inicializar o instanciar la aplicación de express

app.use(express.json()); //para que mi backend acepte peticiones por medio del body, es decir para que el usuario me envíe información a través del body en formato json
app.use(cors()); //es un metodo de seguridad que permite que mi backend acepte peticiones de diferentes dominios

//routes
const userRouter = require('./routes/users.routes'); //ruta de usuarios
const repairsRouter = require('./routes/repairs.routes'); //ruta de raparaciones

app.use('/api/v1/users', userRouter); //end point de los usuarios
app.use('/api/v1/repairs', repairsRouter); //endpoint de las reparaciones

module.exports = app; //exportar el app
