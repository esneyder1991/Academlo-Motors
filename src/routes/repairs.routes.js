const express = require('express');

//Controllers
const repairsController = require('./../controllers/repairs.controller');

//Middlewares
const validationsMiddleware = require('./../middlewares/validations.middleware');
const repairsMiddleware = require('./../middlewares/repairs.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();
router.use(authMiddleware.protect);
router
  .route('/')
  .get(
    authMiddleware.restrictTo('employee'),
    repairsController.findRepairs
  )
  .post(
    validationsMiddleware.repairValidation,
    repairsController.createRepair
  );
router.use(authMiddleware.restrictTo('employee'));
router
  .route('/:id')
  .get(repairsMiddleware.validRepair, repairsController.findRepair)
  .patch(
    repairsMiddleware.validRepair,
    repairsController.updateRepair
  )
  .delete(
    repairsMiddleware.validRepair,
    repairsController.deleteRepair
  );

module.exports = router;
