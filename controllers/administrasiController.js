import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import multer from 'multer'
import path from 'path'
import { convertCSVtoJSON } from '../utils/csvParser.js'
import { promisify } from 'util'

export const createAdministrasi = async (req, res) => {
  req.body.nominalAdministrasi = parseInt(req.body.nominalAdministrasi)
  req.body.tanggalAdministrasi = `${req.body.tanggalAdministrasi}T00:00:00Z`
  const administrasi = await prisma.administrasiKeuangan.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ administrasi })
}

export const getAllAdministrasi = async (req, res) => {
  if (req.body.penerima === 'All') {
    const administrasi = await prisma.administrasiKeuangan.findMany({
      orderBy: { namaProgram: 'asc' }
    })
    res.status(StatusCodes.OK).json({ administrasi })
  } else {
    const administrasi = await prisma.administrasiKeuangan.findMany({
      where: {
        penerimaAdministrasi: req.body.penerima,
        tipeAdministrasi: req.body.tipeAdministrasi
      },
      orderBy: { namaProgram: 'asc' }
    })
    res.status(StatusCodes.OK).json({ administrasi })
  }
}

export const getAllAdministrasiDateRange = async (req, res) => {
  const query = {
    where: {
      tanggalAdministrasi: {
        gte: new Date(req.body.startDate),
        lte: new Date(req.body.endDate)
      }
    },
    orderBy: { namaProgram: 'asc' }
  }

  if (req.body.penerima !== 'All' || undefined) {
    query.where.penerimaAdministrasi = req.body.penerima
  }

  const administrasi = await prisma.administrasiKeuangan.findMany(query)
  res.status(StatusCodes.OK).json({ administrasi })
}

export const getAdministrasi = async (req, res) => {
  const administrasi = await prisma.administrasiKeuangan.findUnique({
    where: { noAdministrasi: parseInt(req.params.noAdministrasi) }
  })
  res.status(StatusCodes.OK).json({ administrasi })
}

export const editAdministrasi = async (req, res) => {
  req.body.nominalAdministrasi = parseInt(req.body.nominalAdministrasi)
  req.body.tanggalAdministrasi = `${req.body.tanggalAdministrasi}T00:00:00Z`
  const administrasi = await prisma.administrasiKeuangan.update({
    where: { noAdministrasi: parseInt(req.params.noAdministrasi) },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ administrasi })
}

export const deleteAdministrasi = async (req, res) => {
  const administrasi = await prisma.administrasiKeuangan.delete({
    where: { noAdministrasi: parseInt(req.params.noAdministrasi) }
  })
  res.status(StatusCodes.OK).json({ administrasi })
}

// csv
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'file')
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname)
    cb(null, `administrasi.csv`)
  }
})

const upload = multer({ storage })

export const CreateManyAdministrasi = async (req, res) => {
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
        tanggalAdministrasi: `${row['Tanggal']}T00:00:00Z`,
        nominalAdministrasi: parseInt(row['Nominal']),
        tipeAdministrasi: row['Tipe'],
        penerimaAdministrasi: row['Penerima'],
        uraianAdministrasi: row['Uraian']
      }
    }

    const jsonData = await convertCSVtoJSON(
      'file/administrasi.csv',
      customRowFormat
    )

    const upToPrisma = await prisma.administrasiKeuangan.createMany({
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
