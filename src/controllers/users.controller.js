const User = require('../models/user.model');

exports.findUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: 'available',
      },
    });
    return res.json({
      results: users.length,
      status: 'success',
      message: 'Products found',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong',
    });
  }
};

exports.createUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong',
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    //? 1. NOS TRAEMOS EL ID DE LOS PARAMETROS
    const { id } = req.params;

    //? 2. BUSCO EL USUARIO EN LA BASE DE DATOS
    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    //? 3. VALIDAR SI EL USUARIO EXISTE, SI NO, ENVIAR UN ERROR 404
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `The user with id: ${id} not found!`,
      });
    }

    //? 4. ENVIAR LA RESPUESTA AL CLIENTE
    return res.status(200).json({
      status: 'success',
      message: 'User found',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // 1. TRAERNOS EL USUARIO QUE IBAMOS A ACTUALIZAR
    const { id } = req.params;
    // 2. NOS TRAJIMOS DEL BODY LA INFORMACION QUE VAMOS A ACTUALIZAR
    const { name, email } = req.body;
    // 3. BUSCAR EL USUARIO QUE VAMOS A ACTUALIZAR
    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    // 4. VALIDAR SI EL USUARIO EXISTE
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} not found`,
      });
    }
    // 5. PROCEDO A ACTUALIZARLO
    const resp = await user.update({ name, email });

    // 6. ENVIO LA CONFIRMACIÓN DE EXITO AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'The user has been updated',
      resp,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    //! traernos el id de los parametros
    const { id } = req.params;
    //! buscar el usuario
    const user = await User.findOne({
      where: {
        status: 'available',
        id,
      },
    });
    //! validar si existe el usuario
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} not found!`,
      });
    }
    //! actualizar el producto encontrado y actualizar el status a false
    await user.update({ status: 'unavailable' }); //eliminacion logica
    //await product.destroy() para eliminacion fisica
    //! enviar respuesta al cliente
    return res.status(200).json({
      status: 'success',
      message: 'the user has been deleted!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};
