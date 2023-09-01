import { Router } from 'express'
const router = Router()

import {
  createRuangan,
  deleteRuangan,
  getAllRuangan,
  updateRuangan
} from '../controllers/ruanganController.js'

import {
  validateIdRuangParam,
  validateRuangInput,
  validateRuangUpdateInput
} from '../middleware/ruanganValidationMiddleware.js'

router.route('/').get(getAllRuangan).post(validateRuangInput, createRuangan)

router
  .route('/:id')
  .patch(validateRuangUpdateInput, validateIdRuangParam, updateRuangan)
  .delete(validateIdRuangParam, deleteRuangan)

export default router
