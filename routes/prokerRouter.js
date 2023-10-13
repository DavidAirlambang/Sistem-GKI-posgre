import { Router } from 'express'
const router = Router()

import {
  createProgramKerja,
  getAllProgramKerja,
  getProgramKerja,
  editProgramKerja,
  deleteProgramKerja,
  CreateManyProgramKerja,
  getAllProgramKerjaDateRange,
  processProgramKerja
} from '../controllers/prokerController.js'
import { validateProgramKerjaInput } from '../middleware/prokerValidationMiddleware.js'

router.route('/').post(getAllProgramKerja)

router.route('/create').post(validateProgramKerjaInput, createProgramKerja)

router
  .route('/:noProker')
  .get(getProgramKerja)
  .patch(validateProgramKerjaInput, editProgramKerja)
  .delete(deleteProgramKerja)

router.route('/filter').post(getAllProgramKerjaDateRange)
router.route('/upload').post(CreateManyProgramKerja)
router.route('/process/:noProker').post(processProgramKerja)

export default router
