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
  if (req.body.status === 'All') {
    req.body.status = undefined
  }
  const programKerja = await prisma.programKerja.findMany({
    where: { komisi: req.body.komisi, statusProker: req.body.status },
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

export const getAllProgramKerjaNama = async (req, res) => {
  const totalAnggaran = await prisma.programKerja.find

  const programKerja = await prisma.programKerja.findMany({
    where: {
      komisi: req.body.komisi,
      statusProker: 'Approved'
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
      statusProker: 'Approved'
    }
  })

  res.status(StatusCodes.OK).json({ programKerja, totalAnggaranSemua })
}

export const getAllProgramKerjaDateRange = async (req, res) => {
  if (req.body.status === 'All') {
    req.body.status = null
  }
  const programKerja = await prisma.programKerja.findMany({
    where: {
      komisi: req.body.komisi,
      tanggalProker: {
        gte: new Date(req.body.startDate),
        lte: new Date(req.body.endDate)
      },
      statusProker: req.body.status
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
    where: {
      noProker: parseInt(req.params.noProker)
    }
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

export const realisasiProgramKerja = async (req, res) => {
  const text = req.body.namaProgram
  const regex = /\((\d+)\)/
  const match = text.match(regex)
  const noProker = match[1]

  const program = await prisma.programKerja.findUnique({
    where: {
      noProker: parseInt(noProker)
    }
  })
  const realisasiTotal =
    parseInt(program.realisasi) + parseInt(req.body.realisasi)

  const programKerja = await prisma.programKerja.update({
    where: { noProker: parseInt(noProker) },
    data: { realisasi: realisasiTotal, laporanProker: req.body.laporan }
  })
  res.status(StatusCodes.OK).json({ programKerja })
}

export const sisaAnggaranProgramKerja = async (req, res) => {
  const text = req.body.namaProgram
  const regex = /\((\d+)\)/
  const match = text.match(regex)
  const noProker = match[1]
  const program = await prisma.programKerja.findUnique({
    where: {
      noProker: parseInt(noProker)
    }
  })
  const laporan = program.laporanProker
  const sisa = parseInt(program.totalAnggaran) - parseInt(program.realisasi)
  res.status(StatusCodes.OK).json({ sisa, laporan })
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

    function gantiGaris (tanggal) {
      if (tanggal.includes('-')) {
        const baru = tanggal.replace(/-/g, '-')
      }
    }

    function customRowFormat (row) {
      console.log(row['Tanggal'])
      return {
        namaProgram: row['Nama Program'],
        penanggungJawab: row['Penanggung Jawab'],
        tujuanKegiatan: row['Tujuan Kegiatan'],
        targetPeserta: row['Target Peserta'],
        waktuPelaksanaan: row['Waktu Pelaksanaan'],
        rincianRencana: row['Rincian Rencana'],
        totalAnggaran: parseInt(row['Total Anggaran']),
        realisasi: 0,
        statusProker: 'Pending',
        komisi: req.body.komisi,
        tanggalProker: new Date(row['Tanggal']).toISOString()
      }
    }

    const jsonData = await convertCSVtoJSON(
      'file/programKerja.csv',
      customRowFormat
    )

    // console.log(jsonData)

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
