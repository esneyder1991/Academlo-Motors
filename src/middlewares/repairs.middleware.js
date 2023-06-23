const Repair = require('../models/repair.model');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.validRepair = catchAsync(async (req, res, next) => {
  try {
    //? 1. NOS TRAEMOS EL ID DE LOS PARAMETROS
    const { id } = req.params;

    //? 2. BUSCO EL USUARIO EN LA BASE DE DATOS
    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    //? 3. VALIDAR SI EL USUARIO EXISTE, SI NO, ENVIAR UN ERROR 404
    if (!repair) {
      return next(new AppError(`User with id:${id} not found`, 404));
      // return res.status(404).json({
      //   status: 'error',
      //   message: `Repair with id: ${id} not found`,
      // });
    }
    //? 4.1 ENVIAR LA RESPUESTA A TRAVÉS DE LA REQUEST(REQ) CREANDO UNA NUEVA PROPIEDAD
    req.repair = repair;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
});
