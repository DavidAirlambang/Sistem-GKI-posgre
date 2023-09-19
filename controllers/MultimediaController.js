import { StatusCodes } from 'http-status-codes'
import prisma from '../utils/prisma.js'

export const createMultimedia = async (req, res) => {
  req.body.jumlahMultimedia = parseInt(req.body.jumlahMultimedia)
  const multimedia = await prisma.multimedia.create({
    data: req.body
  })
  res.status(StatusCodes.CREATED).json({ multimedia })
}

export const getAllMultimedia = async (req, res) => {
  const multimedia = await prisma.multimedia.findMany()
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
