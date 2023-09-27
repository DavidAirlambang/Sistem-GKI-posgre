import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'
import multer from 'multer'
import path from 'path'
import { convertCSVtoJSON } from '../utils/csvParser.js'

const createSuratKeluar = async () => {
  const suratKeluar = await prisma.suratKeluar.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ suratKeluar })
}
