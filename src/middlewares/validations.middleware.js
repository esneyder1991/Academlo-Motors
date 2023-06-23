const { body, validationResult } = require('express-validator'); //importo el body a través de express-validatior para validar todo lo venga en él, por otro lado el validationResult que contiene los resultados de las validaciones que se hicieron

//Esta función es para capturar los errores de las validaciones que se encuentran abajo
const validFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

//Validar de los usuarios name, email y password
exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

//para repairs validar Date, motorsNumber, description
exports.repairValidation = [
  body('date')
    .notEmpty()
    .withMessage('Date cannot be empty')
    .isDate()
    .withMessage('Invalid date format'),
  body('motorsNumber')
    .isEmpty()
    .withMessage('motorNumber cannot be empty')
    .matches(/^([A-Z]{3})\s(\d{2})\s([A-Z]{1})$/)
    .withMessage(
      'The license plate you are looking for does not exist'
    ),
  body('description').isEmpty,
  validFields,
]; //En esta expresión regular, ^([A-Z]{3})\s(\d{2})\s([A-Z]{1})$:
// ^ y $ son anclas que indican que la expresión regular debe coincidir con toda la cadena.
// ([A-Z]{3}) representa tres letras mayúsculas consecutivas.
// \s representa un espacio en blanco.
// (\d{2}) representa dos dígitos consecutivos.
// ([A-Z]{1}) representa una letra mayúscula.

exports.updateUserValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('newPassword')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];
