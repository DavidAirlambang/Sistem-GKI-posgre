import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import multer from 'multer'
import path from 'path'
import { convertCSVtoJSON } from '../utils/csvParser.js'

export const createAsetLain = async (req, res) => {
  req.body.jumlahAsetLain = Math.abs(parseInt(req.body.jumlahAsetLain))
  req.body.nilaiAset = Math.abs(parseInt(req.body.nilaiAset))
  const asetLain = await prisma.asetLain.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ asetLain })
}

export const getAllAsetLain = async (req, res) => {
  const asetLain = await prisma.asetLain.findMany({
    orderBy: { noAsetLain: 'desc' }
  })
  res.status(StatusCodes.OK).json({ asetLain })
}

export const getAsetLain = async (req, res) => {
  const asetLain = await prisma.asetLain.findUnique({
    where: { noAsetLain: parseInt(req.params.noAsetLain) }
  })
  res.status(StatusCodes.OK).json({ asetLain })
}

export const editAsetLain = async (req, res) => {
  req.body.jumlahAsetLain = Math.abs(parseInt(req.body.jumlahAsetLain))
  req.body.nilaiAset = Math.abs(parseInt(req.body.nilaiAset))
  const asetLain = await prisma.asetLain.update({
    where: { noAsetLain: parseInt(req.params.noAsetLain) },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ asetLain })
}

export const deleteAsetLain = async (req, res) => {
  const asetLain = await prisma.asetLain.delete({
    where: { noAsetLain: parseInt(req.params.noAsetLain) }
  })
  res.status(StatusCodes.OK).json({ asetLain })
}

// csv
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'file')
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname)
    cb(null, `asetLain.csv`)
  }
})

const upload = multer({ storage })

export const CreateManyAsetLain = async (req, res) => {
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
          jumlahAsetLain: Math.abs(parseInt(row['Jumlah AsetLain'])),
          peminjamAsetLain: row['Peminjam AsetLain'],
          deskripsiAsetLain: row['Keterangan'],
          lokasiAsetLain: row['Lokasi AsetLain'],
          nilaiAset: Math.abs(parseInt(row['Nilai Aset']))
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
