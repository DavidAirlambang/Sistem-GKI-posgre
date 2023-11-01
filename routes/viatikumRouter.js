import { Router } from 'express'
const router = Router()

import {
  CreateManyViatikum,
  deleteViatikum,
  getAllViatikum,
  createViatikum,
  editViatikum,
  getViatikum,
  getViatikumPeriode
} from '../controllers/viatikumController.js'

import { validateViatikumInput } from '../middleware/viatikumValidationMiddleware.js'
router
  .route('/')
  .get(getAllViatikum)
  .post(validateViatikumInput, createViatikum)

router
  .route('/:noViatikum')
  .get(getViatikum)
  .patch(validateViatikumInput, editViatikum)
  .delete(deleteViatikum)

router.route('/upload').post(CreateManyViatikum)
router.route('/periode').post(getViatikumPeriode)

export default router
