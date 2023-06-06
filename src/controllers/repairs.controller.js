const Repair = require('../models/repair.model');

exports.findRepairs = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong',
    });
  }
};

exports.createRepair = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const repair = await Repair.create({
      date,
      userId,
    });

    return res.status(201).json({
      message: 'The repair has been created',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong',
    });
  }
};

exports.findRepair = async (req, res) => {
  try {
    //? 1. NOS TRAEMOS EL ID DE LOS PARAMETROS
    const { id } = req.params;

    //? 2. BUSCO LA REPARACIÓN EN LA BASE DE DATOS
    const repair = await Repair.findOne({
      where: {
        id,
        status: 'pending',
      },
    });

    //? 3. VALIDAR SI LA REPARACIÓN EXISTE, SI NO, ENVIAR UN ERROR 404
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `The repair with id: ${id} not found!`,
      });
    }

    //? 4. ENVIAR LA RESPUESTA AL CLIENTE
    return res.status(200).json({
      status: 'success',
      message: 'Repair found',
      repair,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    // 1. TRAERNOS LA REPARACIÓN QUE IBAMOS A ACTUALIZAR
    const { id } = req.params;
    // 2. NOS TRAJIMOS DEL BODY LA INFORMACION QUE VAMOS A ACTUALIZAR
    const { status } = req.body;
    // 3. BUSCAR LA REPARACIÓN QUE VAMOS A ACTUALIZAR
    const repair = await Repair.findOne({
      where: {
        status: 'pending',
        id,
      },
    });
    // 4. VALIDAR SI LA REPARACIÓN EXISTE
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `Repair with id: ${id} not found`,
      });
    }
    // 5. PROCEDO A ACTUALIZARLO
    const resp = await repair.update({ status });

    // 6. ENVIO LA CONFIRMACIÓN DE EXITO AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'The repair has been updated',
      resp,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    //! traernos el id de los parametros
    const { id } = req.params;
    //! buscar la reparación
    const repair = await Repair.findOne({
      where: {
        status: 'pending',
        id,
      },
    });
    //! validar si existe la reparación
    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: `Repair with id: ${id} not found!`,
      });
    }
    //! actualizar la reparación encontrada y actualizar el status a false
    await repair.update({ status: 'cancelled' }); //eliminacion logica
    //await product.destroy() //eliminacion fisica
    //! enviar respuesta al cliente
    return res.status(200).json({
      status: 'success',
      message: 'the repair has been deleted!',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};
