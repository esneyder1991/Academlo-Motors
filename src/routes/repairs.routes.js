const express = require('express');

//Controllers
const repairsController = require('./../controllers/repairs.controller');

//Middlewares
const validationsMiddleware = require('./../middlewares/validations.middleware');
const repairsMiddleware = require('./../middlewares/repairs.middleware');

const router = express.Router();

router.route('/').get(repairsController.findRepairs).post(
  // validationsMiddleware.repairValidation,
  repairsController.createRepair
);

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
