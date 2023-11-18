import { Router } from 'express'
const router = Router()
import { getAllUser, getUser, editUser } from '../controllers/authController.js'

router.post('/', getAllUser)
router.route('/:id').get(getUser).post(editUser)

export default router
