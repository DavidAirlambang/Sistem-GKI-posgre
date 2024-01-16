import { Router } from 'express'
const router = Router()

import {
  createMultimedia,
  getAllMultimedia,
  getMultimedia,
  editMultimedia,
  deleteMultimedia,
  CreateManyMultimedia
} from '../controllers/MultimediaController.js'
import { validateMultimediaInput } from '../middleware/multimediaValidationMiddleware.js'

router.route('/').post(validateMultimediaInput, createMultimedia)

router.route('/get').post(getAllMultimedia)

router
  .route('/:noMultimedia')
  .get(getMultimedia)
  .patch(validateMultimediaInput, editMultimedia)
  .delete(deleteMultimedia)

router.route('/upload').post(CreateManyMultimedia)

export default router
