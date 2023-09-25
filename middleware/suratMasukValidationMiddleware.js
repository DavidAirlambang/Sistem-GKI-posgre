import { withValidationErrors } from './validationMiddleware.js'
import { body, param } from 'express-validator'

export const validateSuratMasukInput = withValidationErrors([
  body('noSuratMasuk').notEmpty().withMessage('nomer surat masuk is required'),
  body('tanggalMasuk').notEmpty().withMessage('tanggal masuk is required'),
  body('tanggalSuratMasuk').notEmpty().withMessage('tanggal surat is required'),
  body('pengirimMasuk').notEmpty().withMessage('pengirim is required'),
  body('perihalMasuk').notEmpty().withMessage('perihal is required'),
  body('eventMasuk').notEmpty().withMessage('event is required'),
  body('disposisiMasuk').notEmpty().withMessage('disposisi is required')
])
