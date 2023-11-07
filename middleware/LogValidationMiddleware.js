import { ACTION, KATEGORI } from '../utils/constants.js'
import { withValidationErrors } from './validationMiddleware.js'
import { body, param } from 'express-validator'

export const validateLogInput = withValidationErrors([
//   body('tanggalLog').notEmpty().withMessage('tanggal is required'),
  body('kategoriLog')
    .isIn(Object.values(KATEGORI))
    .withMessage('invalid kategori log'),
  body('actionLog')
    .isIn(Object.values(ACTION))
    .withMessage('invalid action log'),
  body('keterangan').notEmpty().withMessage('keterangan is required')
])
