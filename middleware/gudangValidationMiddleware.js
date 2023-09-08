import { GUDANG } from '../utils/constants.js'
import prisma from '../utils/prisma.js'
import { withValidationErrors } from './validationMiddleware.js'
import { body, param } from 'express-validator'

export const validateGudangInput = withValidationErrors([
  body('namaBarang').notEmpty().withMessage('nama barang is required'),
  body('jumlahBarang').notEmpty().withMessage('jumlah barang is required'),
  body('lokasiGudang')
    .isIn(Object.values(GUDANG))
    .withMessage('gudang tidak tersedia')
])
