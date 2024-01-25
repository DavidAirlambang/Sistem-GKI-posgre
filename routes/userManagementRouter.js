import { Router } from 'express'
const router = Router()
import {
  getAllUser,
  getUser,
  editUser,
  roleUser,
  resetPassword,
  deleteUser
} from '../controllers/authController.js'

router.post('/', getAllUser)
router.route('/:id').get(getUser).post(editUser).delete(deleteUser)
router.route('/role/:id').post(roleUser)
router.patch('/reset/:id', resetPassword)

export default router
