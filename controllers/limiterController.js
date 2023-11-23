import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'

export const getLimit = async (req, res) => {
  const limit = await prisma.limiter.findUnique({
    where: { id: 1 }
  })
  res.status(StatusCodes.OK).json({ limit })
}

export const changeLimit = async (req, res) => {
  req.body.awal = new Date(req.body.awal)
  req.body.akhir = new Date(req.body.akhir)
  const limit = await prisma.limiter.update({
    where: { id: 1 },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ limit })
}
