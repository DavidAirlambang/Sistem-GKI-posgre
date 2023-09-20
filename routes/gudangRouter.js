import { Router } from 'express'
const router = Router()

import {
  createBarangGudang,
  getAllBarangGudang,
  getBarangGudang,
  editBarangGudang,
  deleteBarangGudang,
  CreateManyBarangGudang
} from '../controllers/gudangController.js'
import {
  validateGudangCSV,
  validateGudangInput
} from '../middleware/gudangValidationMiddleware.js'

router
  .route('/')
  .get(getAllBarangGudang)
  .post(validateGudangInput, createBarangGudang)

router
  .route('/:noBarang')
  .get(getBarangGudang)
  .patch(validateGudangInput, editBarangGudang)
  .delete(deleteBarangGudang)

router.route('/upload').post(CreateManyBarangGudang)

export default router
