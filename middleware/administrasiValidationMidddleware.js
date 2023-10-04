import { ADMINISTRASI } from '../utils/constants.js'
import { withValidationErrors } from './validationMiddleware.js'
import { body, param } from 'express-validator'

export const validateAdministrasiInput = withValidationErrors([
  body('tanggalAdministrasi')
    .notEmpty()
    .withMessage('tanggal administrasi is required'),
  body('nominalAdministrasi')
    .notEmpty()
    .withMessage('nominal administrasi is required'),
  body('tipeAdministrasi')
    .isIn(Object.values(ADMINISTRASI))
    .withMessage('tipe tidak tersedia'),
  body('penerimaAdministrasi')
    .notEmpty()
    .withMessage('penerima administrasi is required'),
  body('tipeAdministrasi')
    .notEmpty()
    .withMessage('tipe administrasi is required')
])
