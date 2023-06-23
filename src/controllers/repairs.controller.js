const Repair = require('../models/repair.model');
const catchAsync = require('../utils/catchAsync');

exports.findRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });
  return res.json({
    results: repairs.length,
    status: 'success',
    message: 'Repairs found',
    repairs,
  });
});

exports.createRepair = catchAsync(async (req, res, next) => {
  const { date, motorsNumber, description, userId } = req.body;

  const repair = await Repair.create({
    date,
    userId,
    motorsNumber,
    description,
  });

  return res.status(201).json({
    message: 'The repair has been created',
    repair,
  });
});

exports.findRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;

  //? 4.2 ENVIAR LA RESPUESTA AL CLIENTE
  return res.status(200).json({
    status: 'success',
    message: 'Repair found',
    repair,
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  // NOS TRAJIMOS DEL BODY LA INFORMACION QUE VAMOS A ACTUALIZAR
  const { status } = req.body;

  //Recibimos el repair del middleware
  const { repair } = req;

  // PROCEDO A ACTUALIZARLO
  const resp = await repair.update({ status });

  // 6. ENVIO LA CONFIRMACIÓN DE EXITO AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'The repair has been updated',
    resp,
  });
});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  //! actualizar la reparación encontrada y actualizar el status a false
  // await repair.update({ status: 'cancelled' }); //eliminacion logica
  //await product.destroy() //eliminacion fisica
  //! enviar respuesta al cliente
  return res.status(200).json({
    status: 'success',
    message: 'the repair has been deleted!',
  });
});
