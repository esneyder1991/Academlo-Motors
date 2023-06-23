const AppError = require('../utils/appError');
const { promisify } = require('util');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.protect = catchAsync(async (req, res, next) => {
  //1. extraer el token
  let token;
  //request es un objeto que contiene toda la información del cliente que en este caso contiene los headers y en los cuales hay authorization.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  //2. validar si existe el token
  if (!token) {
    return next(
      new AppError(
        'You are not logged in!, Please log in to get access',
        401
      )
    );
  }

  //3. decodificar el jwt: para este paso es necesario primisificar la función es decir transformar una función que recibe un callback en una que devuelve una promesa dado que en algunas ocasiones es beneficioso trabajar con promesas.
  //decoded contiene { id: 8, iat: 1687383213, exp: 1687390413 } el id, la fecha de creación y la fecha de expiración
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  console.log(decoded);

  //4. Buscar el usuario y validar que exista
  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: 'available',
    },
  });
  if (!user) {
    return next(
      new AppError(
        'The owner of this token it not longer available',
        401
      )
    );
  }
  req.sessionUser = user; //el usuario en sesión es el usuario dueño del token
  //Es decir que para saber si un usuario está en sesión debo validar el token
  //El usuario en session proviene del middleware protect qye está en auth
  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account', 401));
  }
  next();
});
// De ahora en adelante para proteger un endpoint se va a utilizar el protectAccountOwner y al cual se le necesita proveer el usuario en sesión(sessionUser) y el usuario al que se le quiere cambiar la contraseña(user) a traves de la request.
