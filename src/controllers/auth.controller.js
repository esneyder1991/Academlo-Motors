const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('./../utils/jwt');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'The user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  //1. Traernos la información de la req.body
  const { email, password } = req.body;

  //2. Buscar el usuario y revisar si existe
  const user = await User.findOne({
    where: {
      email: email.toLowerCase(), // para buscarlo en minuscula
      status: 'available',
    },
  });

  if (!user) {
    return next(
      new AppError(`User with email: ${email} not found`, 404)
    );
  }

  //3.Validar si la contraseña es correcta
  // el metodo compare que pertenece a bcrypt me permite comparar la contraseña que ingresó el usuario y la que tengo en la base de datos
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401)); //401: es codigo de error de autenticación
  }
  //4. Generar el token
  const token = await generateJWT(user.id);

  //5. Enviar la respuesta (autorización) al cliente
  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req; //  Obtenemos el usuario
  const { currentPassword, newPassword } = req.body; // Recibimos la currentPassword = contraseña actual y newPassword = la contraseña nueva

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    //validamos si la contraseña actual y la contraseña que tengo guardada en base de datos son iguales.
    return next(new AppError('Incorrect password', 401));
  }
  const salt = await bcrypt.genSalt(12); //hay que generar los saltos(hash) para hacer la encriptación a la nueva contraseña
  const encryptedPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    //actualizamos la contraseña
    password: encryptedPassword,
  });
  return res.status(200).json({
    status: 'sucess',
    message: 'The user password was updated successfully',
  });
});

exports.renew = catchAsync(async (req, res, next) => {
  //1.Validar que al momento de renovar efectivamente el usuario en sesión exista trayendo el id
  const { id } = req.sessionUser;

  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }
  //generar el token
  const token = await generateJWT(id);
  return res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
