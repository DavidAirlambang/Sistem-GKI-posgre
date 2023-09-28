import { Router } from 'express'
const router = Router()

import {
  CreateManySuratMasuk,
  deleteSuratMasuk,
  getAllSuratMasuk,
  createSuratMasuk,
  editSuratMasuk,
  getSuratMasuk,
  getAllSuratMasukDateRange
} from '../controllers/suratMasukController.js'

import { validateSuratMasukInput } from '../middleware/suratMasukValidationMiddleware.js'
router
  .route('/')
  .get(getAllSuratMasuk)
  .post(validateSuratMasukInput, createSuratMasuk)

router
  .route('/:noSuratMasuk')
  .get(getSuratMasuk)
  .patch(validateSuratMasukInput, editSuratMasuk)
  .delete(deleteSuratMasuk)

router.route('/upload').post(CreateManySuratMasuk)
router.route('/filter').post(getAllSuratMasukDateRange)

export default router
