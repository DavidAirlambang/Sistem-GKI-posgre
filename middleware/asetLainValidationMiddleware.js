import { ASETLAIN } from '../utils/constants.js'
import { withValidationErrors } from './validationMiddleware.js'
import { body, param } from 'express-validator'

export const validateAsetLainInput = withValidationErrors([
  body('namaAsetLain').notEmpty().withMessage('nama AsetLain is required'),
  body('jumlahAsetLain').notEmpty().withMessage('jumlah Aset Lain is required'),
  body('lokasiAsetLain')
    .isIn(Object.values(ASETLAIN))
    .withMessage('lokasi tidak tersedia')
])
