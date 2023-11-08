import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import multer from 'multer'
import path from 'path'
import { convertCSVtoJSON } from '../utils/csvParser.js'
import { promisify } from 'util'
import { ACTION, KATEGORI } from '../utils/constants.js'

export const createLog = async (req, res) => {
  req.body.tanggalLog = new Date().toISOString()
  req.body.userId = parseInt(req.body.userId)
  const log = await prisma.log.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ log })
}

export const buatLog = async (id, keterangan, kategori, action) => {
  const tanggalLog = new Date()
  const userId = parseInt(id)
  await prisma.log.create({
    data: {
      tanggalLog,
      userId,
      kategoriLog: kategori,
      actionLog: action,
      keterangan
    }
  })
}

export const getAllLog = async (req, res) => {
  const log = await prisma.log.findMany({
    orderBy: { noLog: 'asc' }
  })
  res.status(StatusCodes.OK).json({ log })
}

export const getLog = async (req, res) => {
  const log = await prisma.log.findUnique({
    where: { noLog: parseInt(req.params.noLog) }
  })
  res.status(StatusCodes.OK).json({ log })
}

export const getAllLogDateRange = async (req, res) => {
  const log = await prisma.log.findMany({
    where: {
      tanggalLog: {
        gte: new Date(req.body.startDate),
        lte: new Date(req.body.endDate)
      }
    }
  })
  res.status(StatusCodes.OK).json({ log })
}

export const editLog = async (req, res) => {
  req.params.noLog = parseInt(req.params.noLog)
  req.body.tanggalLog = new Date(req.body.tanggalLog).toISOString()
  req.body.userId = parseInt(req.body.userId)
  const log = await prisma.log.update({
    where: { noLog: parseInt(req.params.noLog) },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ log })
}

export const deleteLog = async (req, res) => {
  const log = await prisma.log.delete({
    where: { noLog: parseInt(req.params.noLog) }
  })
  res.status(StatusCodes.OK).json({ log })
}

// csv
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'file')
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname)
    cb(null, `Log.csv`)
  }
})

const upload = multer({ storage })

export const CreateManyLog = async (req, res) => {
  try {
    const uploadSingleAsync = promisify(upload.single('file'))

    await uploadSingleAsync(req, res)

    if (!req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'File tidak ditemukan.' })
    }

    function customRowFormat (row) {
      return {
        nama: row['Nama'],
        kelompok: row['Kelompok'],
        Log: parseInt(row['Log']),
        tanggalLog: parseInt(row['tanggalLog']),
        tahun: parseInt(row['Tahun']),
        keterangan: row['Keterangan']
      }
    }

    const jsonData = await convertCSVtoJSON('file/Log.csv', customRowFormat)

    const upToPrisma = await prisma.log.createMany({
      data: jsonData
    })

    res.status(StatusCodes.CREATED).json({ upToPrisma })
  } catch (error) {
    console.error('Error handling CSV import:', error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' })
  }
}
