const jwt = require('jsonwebtoken');
// para trabajar con codigo asincrono son necesarias las promesas
const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      //el sign sirve para firmar
      payload, //
      process.env.SECRET_JWT_SEED, // la llave secreta que se encuentra en las variables de entorno las cuales se extraen a traves del process.env
      {
        expiresIn: process.env.JWT_EXPIRE_IN, //este es el tiempo en el que inspira
      },
      //aqui se recibe el err: error y la data:token (aquí se crea el token)
      (err, token) => {
        //se valida primero la inexistencia del token por cuestiones del clean code de no existir se rechaza con reject(la razon del rechazo en este caso el err)
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

module.exports = generateJWT;
