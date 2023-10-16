import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import multer from 'multer'
import path from 'path'
import { convertCSVtoJSON } from '../utils/csvParser.js'
import { promisify } from 'util'

export const createProgramKerja = async (req, res) => {
  req.body.totalAnggaran = parseInt(req.body.totalAnggaran)
  req.body.realisasi = parseInt(req.body.realisasi) || 0
  req.body.tanggalProker = `${req.body.tanggalProker}T00:00:00Z`
  const programKerja = await prisma.programKerja.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ programKerja })
}

export const getAllProgramKerja = async (req, res) => {
  const programKerja = await prisma.programKerja.findMany({
    where: { komisi: req.body.komisi },
    orderBy: { tanggalProker: 'asc' }
  })

  // Menghitung total anggaran untuk semua data dalam tabel ProgramKerja
  const totalAnggaranSemua = await prisma.programKerja.aggregate({
    _sum: {
      totalAnggaran: true
    },
    where: {
      komisi: req.body.komisi,
      statusProker: 'Approved'
    }
  })

  res.status(StatusCodes.OK).json({ programKerja, totalAnggaranSemua })
}

export const getAllProgramKerjaDateRange = async (req, res) => {
  const programKerja = await prisma.programKerja.findMany({
    where: {
      komisi: req.body.komisi,
      tanggalProker: {
        gte: new Date(req.body.startDate),
        lte: new Date(req.body.endDate)
      }
    },
    orderBy: { tanggalProker: 'asc' }
  })

  // Menghitung total anggaran untuk semua data dalam tabel ProgramKerja
  const totalAnggaranSemua = await prisma.programKerja.aggregate({
    _sum: {
      totalAnggaran: true
    },
    where: {
      komisi: req.body.komisi,
      statusProker: 'Approved',
      tanggalProker: {
        gte: new Date(req.body.startDate),
        lte: new Date(req.body.endDate)
      }
    }
  })

  res.status(StatusCodes.OK).json({ programKerja, totalAnggaranSemua })
}

export const getProgramKerja = async (req, res) => {
  const programKerja = await prisma.programKerja.findUnique({
    where: { noProker: parseInt(req.params.noProker) }
  })
  res.status(StatusCodes.OK).json({ programKerja })
}

export const editProgramKerja = async (req, res) => {
  req.body.totalAnggaran = parseInt(req.body.totalAnggaran)
  req.body.realisasi = parseInt(req.body.realisasi)
  req.body.tanggalProker = `${req.body.tanggalProker}T00:00:00Z`
  req.body.statusProker = 'Pending'

  if (req.body.totalAnggaran < req.body.realisasi) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Realisasi tidak boleh lebih besar dari total anggaran' })
  }

  const programKerja = await prisma.programKerja.update({
    where: { noProker: parseInt(req.params.noProker) },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ programKerja })
}

export const processProgramKerja = async (req, res) => {
  const programKerja = await prisma.programKerja.update({
    where: { noProker: parseInt(req.params.noProker) },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ programKerja })
}

export const deleteProgramKerja = async (req, res) => {
  const programKerja = await prisma.programKerja.delete({
    where: { noProker: parseInt(req.params.noProker) }
  })
  res.status(StatusCodes.OK).json({ programKerja })
}

// csv
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'file')
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname)
    cb(null, `programKerja.csv`)
  }
})

const upload = multer({ storage })

export const CreateManyProgramKerja = async (req, res) => {
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
        namaProgram: row['Nama Program'],
        penanggungJawab: row['Penanggung Jawab'],
        tujuanKegiatan: row['Tujuan Kegiatan'],
        targetPeserta: row['Target Peserta'],
        waktuPelaksanaan: row['Waktu Pelaksanaan'],
        rincianRencana: row['Rincian Rencana'],
        totalAnggaran: parseInt(row['Total Anggaran']),
        realisasi: parseInt(row['Realisasi']),
        statusProker: row['Status'],
        komisi: req.body.komisi,
        tanggalProker: `${row['Tanggal']}T00:00:00Z`
      }
    }

    const jsonData = await convertCSVtoJSON(
      'file/programKerja.csv',
      customRowFormat
    )

    const upToPrisma = await prisma.programKerja.createMany({
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
