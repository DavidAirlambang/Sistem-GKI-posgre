import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import { convertCSVtoJSON } from '../utils/csvParser.js'
import multer from 'multer'
import path from 'path'

export const createBarangGudang = async (req, res) => {
  req.body.jumlahBarang = parseInt(req.body.jumlahBarang)
  req.body.nilaiAset = parseInt(req.body.nilaiAset)
  const barangGudang = await prisma.gudang.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ barangGudang })
}

export const getAllBarangGudang = async (req, res) => {
  const lokasiGudang = req.lokasiGudang
  const barangs = await prisma.gudang.findMany({
    where: { lokasiGudang },
    orderBy: { namaBarang: 'asc' }
  })
  res.status(StatusCodes.OK).json({ barangs })
}

export const getBarangGudang = async (req, res) => {
  const barang = await prisma.gudang.findUnique({
    where: { noBarang: parseInt(req.params.noBarang) }
  })
  res.status(StatusCodes.OK).json({ barang })
}

export const editBarangGudang = async (req, res) => {
  req.body.jumlahBarang = parseInt(req.body.jumlahBarang)
  req.body.nilaiAset = parseInt(req.body.nilaiAset)
  const barang = await prisma.gudang.update({
    where: { noBarang: parseInt(req.params.noBarang) },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ barang })
}

export const deleteBarangGudang = async (req, res) => {
  const barang = await prisma.gudang.delete({
    where: { noBarang: parseInt(req.params.noBarang) }
  })
  res.status(StatusCodes.OK).json({ barang })
}

// storage destination
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'file') // Simpan file di direktori 'file'
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname)
    cb(null, `gudang.csv`) // Nama file yang diunggah: 'gudang.csv'
  }
})

const upload = multer({ storage })

export const CreateManyBarangGudang = async (req, res) => {
  try {
    // Menggunakan middleware 'upload.single' untuk menangani unggahan file
    upload.single('file')(req, res, async err => {
      if (err) {
        console.error('Error uploading file:', err)
        return res
          .status(400)
          .json({ error: 'Terjadi kesalahan saat mengunggah file.' })
      }

      // Setelah file diunggah, Anda dapat menggunakan file 'file/gudang.csv'
      function customRowFormat (row) {
        return {
          namaBarang: row['Nama Barang'],
          jumlahBarang: parseInt(row['Jumlah Barang']),
          keterangan: row['Keterangan'],
          lokasiGudang: row['Lokasi Gudang'],
          nilaiAset: parseInt(row['Nilai Aset'])
        }
      }

      const jsonData = await convertCSVtoJSON(
        'file/gudang.csv',
        customRowFormat
      )
      const upToPrisma = await prisma.gudang.createMany({
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
