import { Router } from 'express'
const router = Router()

import {
  CreateManyLog,
  deleteLog,
  getAllLog,
  createLog,
  editLog,
  getLog,
  getAllLogDateRange
} from '../controllers/LogController.js'

import { validateLogInput } from '../middleware/LogValidationMiddleware.js'
router.route('/').get(getAllLog).post(validateLogInput, createLog)

router
  .route('/:noLog')
  .get(getLog)
  .patch(validateLogInput, editLog)
  .delete(deleteLog)

router.route('/upload').post(CreateManyLog)
router.route('/filter').post(getAllLogDateRange)

export default router
