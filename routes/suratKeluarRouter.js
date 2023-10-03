import { Router } from 'express'
const router = Router()

import {
  CreateManySuratKeluar, 
  deleteSuratKeluar,
  getAllSuratKeluar,
  createSuratKeluar,
  editSuratKeluar,
  getSuratKeluar,
  getAllSuratKeluarDateRange
} from '../controllers/suratKeluarController.js'

import { validateSuratKeluarInput } from '../middleware/suratKeluarValidationMiddleware.js'
router
  .route('/')
  .get(getAllSuratKeluar)
  .post(validateSuratKeluarInput, createSuratKeluar)

router
  .route('/:noSuratKeluar')
  .get(getSuratKeluar)
  .patch(validateSuratKeluarInput, editSuratKeluar)
  .delete(deleteSuratKeluar)

router.route('/upload').post(CreateManySuratKeluar)
router.route('/filter').post(getAllSuratKeluarDateRange)

export default router
