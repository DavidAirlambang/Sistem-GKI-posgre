import { MULTIMEDIA } from '../utils/constants.js'
import { withValidationErrors } from './validationMiddleware.js'
import { body, param } from 'express-validator'

export const validateMultimediaInput = withValidationErrors([
  body('namaMultimedia').notEmpty().withMessage('nama multimedia is required'),
  body('jumlahMultimedia')
    .notEmpty()
    .withMessage('jumlah multimedia is required'),
  body('lokasiMultimedia')
    .notEmpty()
    .withMessage('lokasi multimedia is required')
  // body('lokasiMultimedia')
  //   .isIn(Object.values(MULTIMEDIA))
  //   .withMessage('lokasi tidak tersedia')
])
