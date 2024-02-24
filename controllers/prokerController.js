import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import multer from 'multer'
import path from 'path'
import { convertCSVtoJSON } from '../utils/csvParser.js'
import { promisify } from 'util'

export const createProgramKerja = async (req, res) => {
  req.body.totalAnggaran = Math.abs(parseInt(req.body.totalAnggaran))
  req.body.realisasi = Math.abs(parseInt(req.body.realisasi)) || 0
  req.body.tanggalProker = `${req.body.tanggalProker}T00:00:00Z`
  req.body.tahun = req.body.tahun.replace(/\s/g, '')

  // check tahun
  const tahunFormatValid = /^\d{4}-\d{4}$/g.test(req.body.tahun)

  if (!tahunFormatValid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Format tahun tidak valid (ex: 2023-2024)' })
  }

  const limit = await prisma.limiter.findUnique({
    where: { id: 1 }
  })
  const awalDate = new Date(limit.awal)
  const akhirDate = new Date(limit.akhir)
  const tanggalDate = new Date(req.body.tanggalProker)

  if (!(tanggalDate >= awalDate && tanggalDate <= akhirDate)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Periode tidak diizinkan' })
  }

  // check
  const checkProker = await prisma.programKerja.findMany({
    where: {
      kodeProgram: req.body.kodeProgram,
      tahun: req.body.tahun
    }
  })

  if (checkProker.length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Kode Program dengan tahun tersebut sudah ada' })
  }

  // bikin
  const programKerja = await prisma.programKerja.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ programKerja })
}

export const getAllProgramKerja = async (req, res) => {
  if (req.body.status === 'All') {
    req.body.status = undefined
  }

  // tambah tahun
  const { komisi, status, tahun } = req.body
  const whereClause = {
    komisi,
    statusProker: status,
    ...(tahun && { tahun: tahun.replace(/\s/g, '') })
  }

  const programKerja = await prisma.programKerja.findMany({
    where: whereClause,
    orderBy: { noProker: 'desc' }
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
  const programKerja = await prisma.programKerja.findMany({
    where: {
      komisi: req.body.komisi,
      statusProker: 'Approved'
    },
    orderBy: { noProker: 'desc' }
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
    req.body.status = undefined
  }

  const { komisi, startDate, endDate, status, tahun } = req.body

  const whereClause = {
    komisi,
    tanggalProker: {
      gte: new Date(startDate),
      lte: new Date(endDate)
    },
    statusProker: status,
    ...(tahun && { tahun: tahun.replace(/\s/g, '') })
  }

  const programKerja = await prisma.programKerja.findMany({
    where: whereClause,
    orderBy: { noProker: 'desc' }
  })

  // Menghitung total anggaran untuk semua data dalam tabel ProgramKerja
  const totalAnggaranSemua = await prisma.programKerja.aggregate({
    _sum: {
      totalAnggaran: true,
      realisasi: true
    },
    where: {
      ...whereClause,
      statusProker: 'Approved'
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
  req.body.totalAnggaran = Math.abs(parseInt(req.body.totalAnggaran))
  req.body.tanggalProker = `${req.body.tanggalProker}T00:00:00Z`
  req.body.statusProker = 'Pending'
  req.body.tahun = req.body.tahun.replace(/\s/g, '')

  // check tahun
  const tahunFormatValid = /^\d{4}-\d{4}$/g.test(req.body.tahun)

  if (!tahunFormatValid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Format tahun tidak valid (ex: 2023-2024)' })
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
  const regex = /\(([^)]+)\)/
  const match = text.match(regex)
  const programDetails = match[1].split('-')
  const kodeProgram = programDetails[0]
  const tahunProgram = `${programDetails[1]}-${programDetails[2]}`

  const program = await prisma.programKerja.findFirst({
    where: {
      kodeProgram: kodeProgram,
      tahun: tahunProgram,
      statusProker: 'Approved'
    }
  })
  const realisasiTotal =
    parseInt(program.realisasi) + parseInt(req.body.realisasi)

  const programKerja = await prisma.programKerja.updateMany({
    where: { kodeProgram: kodeProgram, tahun: tahunProgram },
    data: { realisasi: realisasiTotal, laporanProker: req.body.laporan }
  })
  res.status(StatusCodes.OK).json({ programKerja })
}

export const sisaAnggaranProgramKerja = async (req, res) => {
  const text = req.body.namaProgram
  const regex = /\(([^)]+)\)/
  const match = text.match(regex)
  const programDetails = match[1].split('-')
  // KA003
  const kodeProgram = programDetails[0]
  // 2024-2025
  const tahunProgram = `${programDetails[1]}-${programDetails[2]}`

  const program = await prisma.programKerja.findFirst({
    where: {
      kodeProgram: kodeProgram,
      tahun: tahunProgram,
      statusProker: 'Approved'
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

    function customRowFormat (row) {
      return {
        kodeProgram: row['Kode Program'],
        namaProgram: row['Nama Program'],
        tahun: row['Tahun Program'],
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
