import { Router } from 'express'
const router = Router()

import {
  createBarangGudang,
  getAllBarangGudang,
  getBarangGudang, 
  editBarangGudang,
  deleteBarangGudang
} from '../controllers/gudangController.js'
import { validateGudangInput } from '../middleware/gudangValidationMiddleware.js'

router
  .route('/')
  .get(getAllBarangGudang)
  .post(validateGudangInput, createBarangGudang)
 
router
  .route('/:noBarang')
  .get(getBarangGudang)
  .patch(validateGudangInput, editBarangGudang)
  .delete(deleteBarangGudang)

export default router
