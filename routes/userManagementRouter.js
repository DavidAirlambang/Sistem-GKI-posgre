import { Router } from 'express'
const router = Router()
import {
  getAllUser,
  getUser,
  editUser,
  roleUser
} from '../controllers/authController.js'

router.post('/', getAllUser)
router.route('/:id').get(getUser).post(editUser)
router.route('/role/:id').post(roleUser)

export default router
