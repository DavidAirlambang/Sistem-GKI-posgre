import { Router } from 'express'
import { changeLimit, getLimit } from '../controllers/limiterController.js'
const router = Router()

router.route('/').patch(changeLimit).get(getLimit)

export default router
