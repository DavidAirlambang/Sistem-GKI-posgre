import { withValidationErrors } from './validationMiddleware.js'
import { body, param } from 'express-validator'

export const validateViatikumInput = withValidationErrors([
  body('nama').notEmpty().withMessage('nama is required'),
  body('kelompok').notEmpty().withMessage('kelompok is required'),
  body('viatikum').notEmpty().withMessage('viatikum is required'),
  body('pertahun').notEmpty().withMessage('pertahun is required'),
  body('tahun').notEmpty().withMessage('tahun is required')
])
