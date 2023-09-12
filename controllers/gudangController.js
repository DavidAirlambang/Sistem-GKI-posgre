import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'

export const createBarangGudang = async (req, res) => {
  req.body.jumlahBarang = parseInt(req.body.jumlahBarang)
  const barangGudang = await prisma.gudang.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ barangGudang })
}

export const getAllBarangGudang = async (req, res) => {
  const lokasiGudang = req.lokasiGudang
  const barangs = await prisma.gudang.findMany({
    where: { lokasiGudang }
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