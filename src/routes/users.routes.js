const express = require('express');

//controllers
const usersController = require('../controllers/users.controller');

//Middleware
const userMiddleware = require('./../middlewares/users.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();
// Estas rutas son para obtener todos los productos  y vienen del app y van a su respectivo archivo controlador: user.controller

//Esto protege todas las rutas de autenticación subsiguiente
// router.use(authMiddleware.protect);

router
  .route('/')
  .get(usersController.findUsers)
  .post(usersController.createUser);

// Estas rutas son para obtener un producto por id y vienen del app y van a su respectivo archivo controlador: user.controller
router
  .route('/:id')
  .get(userMiddleware.validUser, usersController.findUser)
  .patch(
    authMiddleware.protect,
    userMiddleware.validUser,
    usersController.updateUser
  )
  .delete(
    authMiddleware.protect,
    userMiddleware.validUser,
    usersController.deleteUser
  );

module.exports = router;
