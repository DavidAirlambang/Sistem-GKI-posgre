import { Router } from 'express'
import { getCurrentUser, updateUser } from '../controllers/userController.js'
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js'
import {
  authorizePermissions,
  checkForTestUser
} from '../middleware/authMiddleware.js'
import upload from '../middleware/multerMiddleware.js'
const router = Router()

router.get('/current-user', getCurrentUser)

router.patch(
  '/update-user',
  checkForTestUser,
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser
)

export default router
