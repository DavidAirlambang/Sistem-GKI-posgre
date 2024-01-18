import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import { ACTION, KATEGORI, RUANGAN_STATUS } from '../utils/constants.js'
import { buatLog, createLog } from './LogController.js'

export const getAllRuangan = async (req, res) => {
  const ruangans = await prisma.ruangan.findMany({
    orderBy: { noRuangan: 'desc' }
  })
  res.status(StatusCodes.OK).json({ ruangans })
}

export const createRuangan = async (req, res) => {
  req.body.User = { connect: { id: req.user.userId } }
  const ruang = await prisma.ruangan.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ ruang })
}

export const getRuangan = async (req, res) => {
  const ruang = await prisma.ruangan.findUnique({
    where: { noRuangan: req.params.id }
  })
  res.status(StatusCodes.OK).json({ ruang })
}

export const updateRuangan = async (req, res) => {
  const ruang = await prisma.ruangan.update({
    where: { noRuangan: req.params.noRuangan },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ ruang })
}

export const deleteRuangan = async (req, res) => {
  const ruang = await prisma.ruangan.delete({
    where: { noRuangan: req.params.noRuangan }
  })
  res.status(StatusCodes.OK).json({ ruang })
}

export const bookingRuangan = async (req, res) => {
  req.body.userId = parseInt(req.body.userId)
  req.body.statusRuangan = RUANGAN_STATUS.WAITING
  const booking = await prisma.ruangan.update({
    where: { noRuangan: req.params.id },
    data: req.body
  })
  try {
    buatLog(
      req.body.userId,
      `Booking ruangan ${booking.namaRuangan} untuk ${req.body.komisi}`,
      KATEGORI.RUANGAN,
      ACTION.BOOKING
    )
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'error created log' })
  }
  res.status(StatusCodes.OK).json({ booking })
}

export const approveRuangan = async (req, res) => {
  req.body.userId = parseInt(req.body.userId)
  req.body.statusRuangan = RUANGAN_STATUS.OCCUPIED
  const booking = await prisma.ruangan.update({
    where: { noRuangan: req.params.id },
    data: req.body
  })
  try {
    buatLog(
      req.body.userId,
      `Approve booking ruangan ${booking.namaRuangan} untuk ${booking.komisi}`,
      KATEGORI.RUANGAN,
      ACTION.APPROVE
    )
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'error created log' })
  }
  res.status(StatusCodes.OK).json({ booking })
}

export const resetRuangan = async (req, res) => {
  req.body.userId = parseInt(req.body.userId)
  const reset = {
    jadwal: '-',
    keteranganProjector: '-',
    keteranganSoundSystem: '-',
    statusRuangan: RUANGAN_STATUS.AVAILABLE,
    komisi: '-'
  }
  const booking = await prisma.ruangan.update({
    where: { noRuangan: req.params.id },
    data: reset
  })

  try {
    buatLog(
      req.body.userId,
      `Reset booking ruangan ${booking.namaRuangan}`,
      KATEGORI.RUANGAN,
      ACTION.DONE
    )
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'error created log' })
  }

  res.status(StatusCodes.OK).json({ booking })
}
