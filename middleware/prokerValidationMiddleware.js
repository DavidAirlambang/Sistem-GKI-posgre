import { PROGRAM_KERJA, ROLE } from '../utils/constants.js'
import { withValidationErrors } from './validationMiddleware.js'
import { body, param } from 'express-validator'

export const validateProgramKerjaInput = withValidationErrors([
  body('komisi').isIn(Object.values(ROLE)).withMessage('komisi tidak tersedia'),
  body('namaProgram').notEmpty().withMessage('nama program is required'),
  body('penanggungJawab')
    .notEmpty()
    .withMessage('penanggung jawab is required'),

  body('tujuanKegiatan').notEmpty().withMessage('tujuan kegiatan is required'),
  body('targetPeserta').notEmpty().withMessage('target peserta is required'),
  body('waktuPelaksanaan')
    .notEmpty()
    .withMessage('waktu pelaksanaan is required'),
  body('totalAnggaran').notEmpty().withMessage('total anggaran is required'),
  body('tanggalProker')
    .notEmpty()
    .withMessage('tanggal program kerja is required')
])
