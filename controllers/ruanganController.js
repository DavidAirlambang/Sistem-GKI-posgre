import { StatusCodes } from 'http-status-codes'
import User from '../models/UserModel.js'
import { comparePassword, hashPassword } from '../utils/passwordUtils.js'
import { UnauthenticatedError } from '../errors/customErrors.js'
import { createJWT } from '../utils/tokenUtils.js'
import prisma from '../utils/prisma.js'

export const getAllRuangan = async (req, res) => {
  const ruangans = await prisma.ruangan.findMany()
  res.status(StatusCodes.OK).json({ ruangans })
}

export const createRuangan = async (req, res) => {
  console.log(req.user.userId)

  req.body.fasilitasRuangan = req.body.fasilitasRuangan.split(',')
  req.body.user = { connect: { id: req.user.userId } }
  const ruang = await prisma.ruangan.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ ruang })
}

export const getRuangan = async (req, res) => {}

export const updateRuangan = async (req, res) => {
  req.body.noRuangan = req.params.id
  const ruang = await prisma.ruangan.update({
    where: { noRuangan: req.params.id },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ ruang })
}

export const deleteRuangan = async (req, res) => {
  const ruang = await prisma.ruangan.delete({
    where: { noRuangan: req.params.id }
  })
  res.status(StatusCodes.OK).json({ ruang })
}
