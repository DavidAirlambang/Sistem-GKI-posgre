import { Router } from 'express'
const router = Router()

import { 
  createAsetLain,
  getAllAsetLain,
  getAsetLain,
  editAsetLain,
  deleteAsetLain,
  CreateManyAsetLain
} from '../controllers/asetLainController.js'
import { validateAsetLainInput } from '../middleware/asetLainValidationMiddleware.js'

router
  .route('/')
  .get(getAllAsetLain)
  .post(validateAsetLainInput, createAsetLain)

router
  .route('/:noAsetLain')
  .get(getAsetLain)
  .patch(validateAsetLainInput, editAsetLain)
  .delete(deleteAsetLain)

router.route('/upload').post(CreateManyAsetLain)

export default router
