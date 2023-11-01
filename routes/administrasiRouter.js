import { Router } from 'express'
const router = Router()

import {
  createAdministrasi,
  getAllAdministrasi,
  getAdministrasi,
  editAdministrasi,
  deleteAdministrasi,
  CreateManyAdministrasi, 
  getAllAdministrasiDateRange
} from '../controllers/administrasiController.js'
import { validateAdministrasiInput } from '../middleware/administrasiValidationMidddleware.js'

router.route('/').post(getAllAdministrasi)

router.route('/create').post(validateAdministrasiInput, createAdministrasi)

router
  .route('/:noAdministrasi')
  .get(getAdministrasi)
  .patch(validateAdministrasiInput, editAdministrasi)
  .delete(deleteAdministrasi)

router.route('/penerimaanFilter').post(getAllAdministrasiDateRange)
router.route('/upload').post(CreateManyAdministrasi)

export default router
