const cors = require('cors'); //importación de cors
const express = require('express'); //importación de express
const morgan = require('morgan');
const AppError = require('./utils/appError'); //importación del controlador de errores
const globalErrorHandler = require('./controllers/error.controller'); //importación del manejador de errores

const app = express(); //inicializar o instanciar la aplicación de express

app.use(express.json()); //para que mi backend acepte peticiones por medio del body, es decir para que el usuario me envíe información a través del body en formato json
app.use(cors()); //es un metodo de seguridad que permite que mi backend acepte peticiones de diferentes dominios

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //Proporciona información detallada sobre las solicitudes que llegan al servidor, como la URL, el método HTTP, el código de estado de respuesta, el tiempo de respuesta, entre otros.
}

//routes
const authRouter = require('./routes/auth.routes'); //ruta de autenticación de los usuarios
const userRouter = require('./routes/users.routes'); //ruta de usuarios
const repairsRouter = require('./routes/repairs.routes'); //ruta de raparaciones

//endpoints o rutas
app.use('/api/v1/auth', authRouter); //endpoint de la autenticación de los usuarios
app.use('/api/v1/users', userRouter); //endpoint de los usuarios
app.use('/api/v1/repairs', repairsRouter); //endpoint de las reparaciones

app.all('*', (req, res, next) => {
  return next(
    new AppError(
      `can't find ${req.originalUrl} on this server! 😡`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app; //exportar el app

//Este middleware se realizó antes de la centralización de errores: Middleware para capturar todas las excepciones a los envios y enviar un error mas entendible, el (*) que cualquier ruta que no se haya especificado anteriormente se va a capturar en este middleware. req.originalUrl es una funcionalidad de express para tomar la URL equivocada.
// app.all('*', (req, res, next) => {
//   return res.status(404).json({
//     status: 'error',
//     message: `can't find ${req.originalUrl} on this server! 😡`,
//   });
// });
