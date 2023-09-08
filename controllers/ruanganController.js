import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import { RUANGAN_STATUS } from '../utils/constants.js'

export const getAllRuangan = async (req, res) => {
  const ruangans = await prisma.ruangan.findMany()
  res.status(StatusCodes.OK).json({ ruangans })
}

export const createRuangan = async (req, res) => {
  req.body.user = { connect: { id: req.user.userId } }
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

export const bookingRuangan = async (req, res) => {
  console.log(req.params)
  // const ruang = await prisma.ruangan.findUnique({
  //   where: { noRuangan: req.params.id }
  // })
  // if (ruang) {
  //   console.log(ruang)
  // } else {
  //   console.log('gk tw')
  // }
  // res.status(StatusCodes.OK).json({ ruang })

  req.body.statusRuangan = RUANGAN_STATUS.WAITING
  const booking = await prisma.ruangan.update({
    where: { noRuangan: req.params.id },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ booking })
}

export const approveRuangan = async (req, res) => {
  req.body.statusRuangan = RUANGAN_STATUS.OCCUPIED
  const booking = await prisma.ruangan.update({
    where: { noRuangan: req.params.id },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ booking })
}

export const resetRuangan = async (req, res) => {
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
  res.status(StatusCodes.OK).json({ booking })
}
