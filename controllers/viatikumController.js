import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import multer from 'multer'
import path from 'path'
import { convertCSVtoJSON } from '../utils/csvParser.js'
import { promisify } from 'util'

export const createViatikum = async (req, res) => {
  req.body.viatikum = parseInt(req.body.viatikum)
  req.body.pertahun = parseInt(req.body.pertahun)
  req.body.tahun = parseInt(req.body.tahun)
  const viatikum = await prisma.viatikum.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ viatikum })
}

export const getAllViatikum = async (req, res) => {
  const viatikum = await prisma.viatikum.findMany({
    orderBy: { noViatikum: 'asc' }
  })
  res.status(StatusCodes.OK).json({ viatikum })
}

export const getViatikum = async (req, res) => {
  const viatikum = await prisma.viatikum.findUnique({
    where: { noViatikum: parseInt(req.params.noViatikum) }
  })
  res.status(StatusCodes.OK).json({ viatikum })
}

export const getViatikumPeriode = async (req, res) => {
  const viatikum = await prisma.viatikum.findMany({
    where: { tahun: parseInt(req.body.tahun) },
    orderBy: { noViatikum: 'asc' }
  })
  res.status(StatusCodes.OK).json({ viatikum })
}

export const editViatikum = async (req, res) => {
  req.body.viatikum = parseInt(req.body.viatikum)
  req.body.pertahun = parseInt(req.body.pertahun)
  req.body.tahun = parseInt(req.body.tahun)
  const viatikum = await prisma.viatikum.update({
    where: { noViatikum: parseInt(req.params.noViatikum) },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ viatikum })
}

export const deleteViatikum = async (req, res) => {
  const viatikum = await prisma.viatikum.delete({
    where: { noViatikum: parseInt(req.params.noViatikum) }
  })
  res.status(StatusCodes.OK).json({ viatikum })
}

// csv
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'file')
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname)
    cb(null, `Viatikum.csv`)
  }
})

const upload = multer({ storage })

export const CreateManyViatikum = async (req, res) => {
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
        viatikum: parseInt(row['Viatikum']),
        pertahun: parseInt(row['Pertahun']),
        tahun: parseInt(row['Tahun']),
        keterangan: row['Keterangan']
      }
    }

    const jsonData = await convertCSVtoJSON(
      'file/Viatikum.csv',
      customRowFormat
    )

    const upToPrisma = await prisma.viatikum.createMany({
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