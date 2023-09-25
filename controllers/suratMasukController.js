import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import multer from 'multer'
import path from 'path'
import { convertCSVtoJSON } from '../utils/csvParser.js'

export const createSuratMasuk = async (req, res) => {
  const suratMasuk = await prisma.suratMasuk.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ suratMasuk })
}

export const getAllSuratMasuk = async (req, res) => {
  const suratMasuk = await prisma.suratMasuk.findMany()
  res.status(StatusCodes.OK).json({ suratMasuk })
}

export const getSuratMasuk = async (req, res) => {
  const suratMasuk = await prisma.suratMasuk.findUnique({
    where: { noSuratMasuk: req.params.noSuratMasuk }
  })
  res.status(StatusCodes.OK).json({ suratMasuk })
}

export const editSuratMasuk = async (req, res) => {
  const suratMasuk = await prisma.suratMasuk.update({
    where: { noSuratMasuk: req.params.noSuratMasuk },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ suratMasuk })
}

export const deleteSuratMasuk = async (req, res) => {
  const getAllSuratMasuk = await prisma.getAllSuratMasuk.delete({
    where: { noSuratMasuk: req.params.noSuratMasuk }
  })
  res.status(StatusCodes.OK).json({ getAllSuratMasuk })
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
    upload.single('file')(req, res, async err => {
      if (err) {
        console.error('Error uploading file:', err)
        return res
          .status(400)
          .json({ error: 'Terjadi kesalahan saat mengunggah file.' })
      }

      function customRowFormat (row) {
        return {
          namaAsetLain: row['Nama AsetLain'],
          jenisAsetLain: row['Jenis AsetLain'],
          jumlahAsetLain: parseInt(row['Jumlah AsetLain']),
          peminjamAsetLain: row['Peminjam AsetLain'],
          deskripsiAsetLain: row['Keterangan'],
          lokasiAsetLain: row['Lokasi AsetLain']
        }
      }

      const jsonData = await convertCSVtoJSON(
        'file/asetLain.csv',
        customRowFormat
      )
      console.log(jsonData)
      const upToPrisma = await prisma.asetLain.createMany({
        data: jsonData
      })

      res.status(StatusCodes.CREATED).json({ upToPrisma })
    })
  } catch (error) {
    console.error('Error handling CSV import:', error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' })
  }
}
