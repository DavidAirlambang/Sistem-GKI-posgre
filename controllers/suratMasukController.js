import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import multer from 'multer'
import path from 'path'
import { convertCSVtoJSON } from '../utils/csvParser.js'
import { promisify } from 'util'

export const createSuratMasuk = async (req, res) => {
  req.body.tanggalMasuk = `${req.body.tanggalMasuk}T00:00:00Z`
  req.body.tanggalSuratMasuk = `${req.body.tanggalSuratMasuk}T00:00:00Z`
  const suratMasuk = await prisma.suratMasuk.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ suratMasuk })
}

export const getAllSuratMasuk = async (req, res) => {
  const suratMasuk = await prisma.suratMasuk.findMany()
  res.status(StatusCodes.OK).json({ suratMasuk })
}

export const getAllSuratMasukDateRange = async (req, res) => {
  const suratMasuk = await prisma.suratMasuk.findMany({
    where: {
      // sementara tanggal surat masuk
      tanggalSuratMasuk: {
        gte: new Date(req.body.startDate), // "gte" berarti lebih besar dari atau sama dengan tanggal awal
        lte: new Date(req.body.endDate) // "lte" berarti kurang dari atau sama dengan tanggal akhir
      }
    }
  })
  res.status(StatusCodes.OK).json({ suratMasuk })
}

export const getSuratMasuk = async (req, res) => {
  const suratMasuk = await prisma.suratMasuk.findUnique({
    where: { noSuratMasuk: req.params.noSuratMasuk }
  })
  res.status(StatusCodes.OK).json({ suratMasuk })
}

export const editSuratMasuk = async (req, res) => {
  req.body.tanggalMasuk = `${req.body.tanggalMasuk}T00:00:00Z`
  req.body.tanggalSuratMasuk = `${req.body.tanggalSuratMasuk}T00:00:00Z`
  const suratMasuk = await prisma.suratMasuk.update({
    where: { noSuratMasuk: req.params.noSuratMasuk },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ suratMasuk })
}

export const deleteSuratMasuk = async (req, res) => {
  const suratMasuk = await prisma.suratMasuk.delete({
    where: { noSuratMasuk: req.params.noSuratMasuk }
  })
  res.status(StatusCodes.OK).json({ suratMasuk })
}

// csv
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'file')
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname)
    cb(null, `suratMasuk.csv`)
  }
})

const upload = multer({ storage })

export const CreateManySuratMasuk = async (req, res) => {
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
        noSuratMasuk: row['No Surat'],
        tanggalMasuk: `${row['Tanggal Masuk']}T00:00:00Z`,
        tanggalSuratMasuk: `${row['Tanggal Surat']}T00:00:00Z`,
        pengirimMasuk: row['Pengirim'],
        perihalMasuk: row['Perihal'],
        eventMasuk: row['Event'],
        disposisiMasuk: row['Disposisi']
      }
    }

    const jsonData = await convertCSVtoJSON(
      'file/suratMasuk.csv',
      customRowFormat
    )
    // console.log(jsonData)

    // Gunakan transaksi jika diperlukan
    const upToPrisma = await prisma.$transaction(
      jsonData.map(data =>
        prisma.suratMasuk.upsert({
          where: { noSuratMasuk: data.noSuratMasuk },
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
