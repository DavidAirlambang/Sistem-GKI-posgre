import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import multer from 'multer'
import path from 'path'
import { convertCSVtoJSON } from '../utils/csvParser.js'

export const createMultimedia = async (req, res) => {
  req.body.jumlahMultimedia = parseInt(req.body.jumlahMultimedia)
  req.body.nilaiAset = parseInt(req.body.nilaiAset)
  const multimedia = await prisma.multimedia.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ multimedia })
}

export const getAllMultimedia = async (req, res) => {
  const multimedia = await prisma.multimedia.findMany({
    orderBy: { namaMultimedia: 'asc' }
  })
  res.status(StatusCodes.OK).json({ multimedia })
}

export const getMultimedia = async (req, res) => {
  const multimedia = await prisma.multimedia.findUnique({
    where: { noMultimedia: parseInt(req.params.noMultimedia) }
  })
  res.status(StatusCodes.OK).json({ multimedia })
}

export const editMultimedia = async (req, res) => {
  req.body.jumlahMultimedia = parseInt(req.body.jumlahMultimedia)
  req.body.nilaiAset = parseInt(req.body.nilaiAset)
  const multimedia = await prisma.multimedia.update({
    where: { noMultimedia: parseInt(req.params.noMultimedia) },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ multimedia })
}

export const deleteMultimedia = async (req, res) => {
  const multimedia = await prisma.multimedia.delete({
    where: { noMultimedia: parseInt(req.params.noMultimedia) }
  })
  res.status(StatusCodes.OK).json({ multimedia })
}

// csv
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'file')
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname)
    cb(null, `multimedia.csv`)
  }
})

const upload = multer({ storage })

export const CreateManyMultimedia = async (req, res) => {
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
          namaMultimedia: row['Nama Multimedia'],
          jenisMultimedia: row['Jenis Multimedia'],
          jumlahMultimedia: parseInt(row['Jumlah Multimedia']),
          peminjamMultimedia: row['Peminjam Multimedia'],
          deskripsiMultimedia: row['Keterangan'],
          lokasiMultimedia: row['Lokasi Multimedia']
        }
      }

      const jsonData = await convertCSVtoJSON(
        'file/multimedia.csv',
        customRowFormat
      )
      console.log(jsonData)
      const upToPrisma = await prisma.multimedia.createMany({
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
