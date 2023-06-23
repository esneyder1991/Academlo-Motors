const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });
  return res.json({
    results: users.length,
    status: 'success',
    message: 'User found',
    users,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return res.status(200).json({
    message: 'The user has been created',
    user,
  });
});

exports.findUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  //esto se usó para probar los errores 500 throw new Error('esto es un error intencional');

  return res.status(200).json({
    status: 'success',
    message: 'User found',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;

  const { user } = req;

  const resp = await user.update({ name, email });

  //? 4.2 ENVIAR LA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'The user has been updated',
    resp,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  //! actualizar el producto encontrado y actualizar el status a false
  await user.update({ status: 'unavailable' }); //eliminacion logica
  //await user.destroy() para eliminacion fisica
  //! enviar respuesta al cliente
  return res.status(200).json({
    status: 'success',
    message: 'the user has been deleted!',
  });
});
