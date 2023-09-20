import { GUDANG } from '../utils/constants.js'
import prisma from '../utils/prisma.js'
import { withValidationErrors } from './validationMiddleware.js'
import { body, validationResult } from 'express-validator'

const validateRow = [
  body('namaBarang').notEmpty().withMessage('Nama barang is required'),
  body('jumlahBarang')
    .notEmpty()
    .withMessage('Jumlah barang is required')
    .isInt()
    .withMessage('Jumlah barang harus berupa angka'),
  body('lokasiGudang')
    .isIn(Object.values(GUDANG))
    .withMessage('Gudang tidak tersedia')
]

export const validateGudangInput = withValidationErrors(validateRow)

export const validateGudangCSV = (req, res, next) => {
  const jsonData = req.body

  // Validasi setiap baris data
  for (const row of jsonData) {
    validateRow.forEach(validator => validator.run(row))
  }

  const validationErrors = validationResult(req)

  if (!validationErrors.isEmpty()) {
    console.error('Validation errors:', validationErrors.array())
    return res.status(400).json({ errors: validationErrors.array() })
  }

  next()
}
