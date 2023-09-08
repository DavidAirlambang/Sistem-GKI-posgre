import { Router } from 'express'
const router = Router()

import {
  approveRuangan,
  bookingRuangan,
  createRuangan,
  deleteRuangan,
  getAllRuangan,
  getRuangan,
  resetRuangan,
  updateRuangan
} from '../controllers/ruanganController.js'

import {
  validateBookingRuangInput,
  validateIdRuangParam,
  validateRuangInput, 
  validateRuangUpdateInput
} from '../middleware/ruanganValidationMiddleware.js'

router.route('/').get(getAllRuangan).post(validateRuangInput, createRuangan)

router
  .route('/booking/:id')
  // .patch(validateRuangUpdateInput, validateIdRuangParam, updateRuangan)
  .patch(validateBookingRuangInput, bookingRuangan)
  .delete(validateIdRuangParam, deleteRuangan)
  .get(getRuangan)

router.route('/approve/:id').patch(approveRuangan)
router.route('/reset/:id').patch(resetRuangan)

export default router
