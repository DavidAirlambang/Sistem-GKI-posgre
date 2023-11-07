import { withValidationErrors } from './validationMiddleware.js'
import { body, param } from 'express-validator'

export const validateSuratKeluarInput = withValidationErrors([
  body('noSuratKeluar')
    .notEmpty()
    .withMessage('nomer surat keluar is required'),
  body('tanggalSuratKeluar')
    .notEmpty()
    .withMessage('tanggal surat is required'),
  body('tujuanKeluar').notEmpty().withMessage('tujuan is required'),
  body('perihalKeluar').notEmpty().withMessage('perihal is required')
])
 