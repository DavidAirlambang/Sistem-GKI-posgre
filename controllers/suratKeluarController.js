import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import multer from 'multer'
import path from 'path'
import { convertCSVtoJSON } from '../utils/csvParser.js'
import { promisify } from 'util'

export const createSuratKeluar = async (req, res) => {
  req.body.tanggalSuratKeluar = `${req.body.tanggalSuratKeluar}T00:00:00Z`
  const suratKeluar = await prisma.suratKeluar.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ suratKeluar })
}

export const getAllSuratKeluar = async (req, res) => {
  const suratKeluar = await prisma.suratKeluar.findMany()
  res.status(StatusCodes.OK).json({ suratKeluar })
}

export const getAllSuratKeluarDateRange = async (req, res) => {
  const suratKeluar = await prisma.suratKeluar.findMany({
    where: {
      // sementara tanggal surat Keluar
      tanggalSuratKeluar: {
        gte: new Date(req.body.startDate), // "gte" berarti lebih besar dari atau sama dengan tanggal awal
        lte: new Date(req.body.endDate) // "lte" berarti kurang dari atau sama dengan tanggal akhir
      }
    }
  })
  res.status(StatusCodes.OK).json({ suratKeluar })
}

export const getSuratKeluar = async (req, res) => {
  const suratKeluar = await prisma.suratKeluar.findUnique({
    where: { noSuratKeluar: req.params.noSuratKeluar }
  })
  res.status(StatusCodes.OK).json({ suratKeluar })
}

export const editSuratKeluar = async (req, res) => {
  req.body.tanggalSuratKeluar = `${req.body.tanggalSuratKeluar}T00:00:00Z`
  const suratKeluar = await prisma.suratKeluar.update({
    where: { noSuratKeluar: req.params.noSuratKeluar },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ suratKeluar })
}

export const deleteSuratKeluar = async (req, res) => {
  const suratKeluar = await prisma.suratKeluar.delete({
    where: { noSuratKeluar: req.params.noSuratKeluar }
  })
  res.status(StatusCodes.OK).json({ suratKeluar })
}

// csv
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'file')
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname)
    cb(null, `suratKeluar.csv`)
  }
})

const upload = multer({ storage })

export const CreateManySuratKeluar = async (req, res) => {
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
        noSuratKeluar: row['No Surat'],
        tanggalSuratKeluar: `${row['Tanggal Surat']}T00:00:00Z`,
        tujuanKeluar: row['Tujuan'],
        perihalKeluar: row['Perihal']
      }
    }

    const jsonData = await convertCSVtoJSON(
      'file/suratKeluar.csv',
      customRowFormat
    )
    // console.log(jsonData)

    // Gunakan transaksi jika diperlukan
    const upToPrisma = await prisma.$transaction(
      jsonData.map(data =>
        prisma.suratKeluar.upsert({
          where: { noSuratKeluar: data.noSuratKeluar },
          create: data,
          update: data
        })
      )
    )

    res.status(StatusCodes.CREATED).json({ upToPrisma })
  } catch (error) {
    console.error('Error handling CSV import:', error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' })
  }
}
