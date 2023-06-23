const express = require('express');

//controllers
const authController = require('../controllers/auth.controller');

//Middlewares
const valdationsMiddleware = require('./../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/users.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

//Ejemplo de ruta simple router.post("/", createProduct);
router.post(
  '/signup',
  valdationsMiddleware.createUserValidation,
  authController.signup
);

router.post(
  '/login',
  valdationsMiddleware.loginUserValidation,
  authController.login
);

router.use(authMiddleware.protect);

router.get('/renew', authController.renew);

router.patch(
  '/password/:id',
  valdationsMiddleware.updateUserValidation,
  userMiddleware.validUser,
  authMiddleware.protectAccountOwner,
  authController.updatePassword
);

module.exports = router;
