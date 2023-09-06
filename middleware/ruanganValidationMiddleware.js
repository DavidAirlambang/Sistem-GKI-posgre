import { RUANGAN_STATUS } from '../utils/constants.js'
import prisma from '../utils/prisma.js'
import { withValidationErrors } from './validationMiddleware.js'
import { body, param } from 'express-validator'

export const validateRuangInput = withValidationErrors([
  body('noRuangan').notEmpty().withMessage('no ruangan is required'),
  body('namaRuangan').notEmpty().withMessage('nama ruangan is required'),
  body('kapasitasRuangan')
    .notEmpty()
    .withMessage('kapasitas ruangan is required'),
  body('statusRuangan')
    .isIn(Object.values(RUANGAN_STATUS))
    .withMessage('invalid status ruangan')
])

export const validateRuangUpdateInput = withValidationErrors([
  body('jadwal').notEmpty().withMessage('jadwal is required'),
  body('statusRuangan')
    .isIn(Object.values(RUANGAN_STATUS))
    .withMessage('invalid status ruangan')
])

export const validateIdRuangParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    // Periksa apakah id adalah id yang valid dalam Prisma

    const ruangan = await prisma.ruangan.findUnique({
      where: {
        noRuangan: value // Pastikan Anda mengonversi id ke tipe yang benar sesuai dengan model Anda
      }
    })

    if (!ruangan) throw new NotFoundError(`no ruangan with id ${value}`)

    const isAdmin = req.user.role === 'admin'
    const isOwner = req.user.userId === ruangan.createdBy

    if (!isAdmin && !isOwner)
      throw new UnauthorizedError('not authorized to access this route')
  })
])
