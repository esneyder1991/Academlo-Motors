const express = require('express');

//controllers
const usersController = require('../controllers/users.controller');

//Middleware
const userMiddleware = require('./../middlewares/users.middleware');

const router = express.Router();
// Estas rutas son para obtener todos los productos  y vienen del app y van a su respectivo archivo controlador: user.controller
router
  .route('/')
  .get(usersController.findUsers)
  .post(usersController.createUser);

// Estas rutas son para obtener un producto por id y vienen del app y van a su respectivo archivo controlador: user.controller
router
  .route('/:id')
  .get(userMiddleware.validUser, usersController.findUser)
  .patch(userMiddleware.validUser, usersController.updateUser)
  .delete(userMiddleware.validUser, usersController.deleteUser);

module.exports = router;
