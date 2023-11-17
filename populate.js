// populate.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function populateRuangan () {
  const ruanganData = [
    {
      namaRuangan: 'Gedung Gereja',
      kapasitasRuangan: '350 Orang',
      statusRuangan: 'Available'
    },
    {
      namaRuangan: 'BPB',
      kapasitasRuangan: '50 Orang',
      statusRuangan: 'Available'
    },
    {
      namaRuangan: 'BPA',
      kapasitasRuangan: '150 Orang',
      statusRuangan: 'Available'
    },
    {
      namaRuangan: 'Auvi',
      kapasitasRuangan: '50 Orang',
      statusRuangan: 'Available'
    },
    {
      namaRuangan: 'Sekolah Minggu 7',
      kapasitasRuangan: '15 Orang',
      statusRuangan: 'Available'
    },
    {
      namaRuangan: 'Sekolah Minggu 8',
      kapasitasRuangan: '15 Orang',
      statusRuangan: 'Available'
    }
  ]

  try {
    for (const data of ruanganData) {
      await prisma.ruangan.create({ data })
    }
    console.log('Data ruangan berhasil dipopulasi.')
  } catch (error) {
    console.error('Gagal mempopulasi data ruangan:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Panggil fungsi untuk memulai proses populasi
populateRuangan()
