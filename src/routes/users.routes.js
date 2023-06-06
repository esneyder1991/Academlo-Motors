const express = require('express');

//controllers
const usersController = require('../controllers/users.controller');

const router = express.Router();
// Estas rutas son para obtener todos los productos  y vienen del app y van a su respectivo archivo controlador: user.controller
router
  .route('/')
  .get(usersController.findUsers)
  .post(usersController.createUser);

// Estas rutas son para obtener un producto por id y vienen del app y van a su respectivo archivo controlador: user.controller
router
  .route('/:id')
  .get(usersController.findUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
