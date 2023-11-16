import { ASETLAIN } from '../utils/constants.js'
import { withValidationErrors } from './validationMiddleware.js'
import { body, param } from 'express-validator'

export const validateAsetLainInput = withValidationErrors([
  body('namaAsetLain').notEmpty().withMessage('nama aset lain is required'),
  body('jumlahAsetLain').notEmpty().withMessage('jumlah aset lain is required'),
  body('lokasiAsetLain').notEmpty().withMessage('lokasi aset lain is required')
  // body('lokasiAsetLain')
  //   .isIn(Object.values(ASETLAIN))
  //   .withMessage('lokasi tidak tersedia')
])
