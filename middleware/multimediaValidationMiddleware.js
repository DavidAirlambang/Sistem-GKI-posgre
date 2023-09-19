import { MULTIMEDIA } from '../utils/constants.js'
import { withValidationErrors } from './validationMiddleware.js'
import { body, param } from 'express-validator'

export const validateMultimediaInput = withValidationErrors([
  body('namaMultimedia').notEmpty().withMessage('nama Multimedia is required'),
  body('jumlahMultimedia')
    .notEmpty()
    .withMessage('jumlah Multimedia is required'),
  body('lokasiMultimedia')
    .isIn(Object.values(MULTIMEDIA))
    .withMessage('lokasi tidak tersedia')
])
