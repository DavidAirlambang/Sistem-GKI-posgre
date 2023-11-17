import { StatusCodes } from 'http-status-codes'
import { comparePassword, hashPassword } from '../utils/passwordUtils.js'
import { UnauthenticatedError } from '../errors/customErrors.js'
import { createJWT } from '../utils/tokenUtils.js'

// prisma
import prisma from '../utils/prisma.js'

export const register = async (req, res) => {
  const isFirstAccount = (await prisma.user.count()) === 0
  req.body.role = isFirstAccount ? 'admin' : req.body.role
  req.body.active = isFirstAccount ? true : false

  const hashedPassword = await hashPassword(req.body.password)
  req.body.password = hashedPassword

  const user = await prisma.user.create({ data: req.body })
  res.status(StatusCodes.CREATED).json({ msg: 'user created' })
}

export const getAllUser = async (req, res) => {
  if (req.body.role && req.body.role !== 'All') {
    const user = await prisma.user.findMany({
      where: { role: req.body.role },
      orderBy: { name: 'asc' }
    })
    res.status(StatusCodes.OK).json({ user })
  } else {
    const user = await prisma.user.findMany({ orderBy: { name: 'asc' } })
    res.status(StatusCodes.OK).json({ user })
  }
}

export const getUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) }
  })
  res.status(StatusCodes.OK).json({ user })
}

export const editUser = async (req, res) => {
  const user = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ user })
}

export const login = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email }
  })

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password))

  const userActive = isValidUser && user.active === true

  if (!isValidUser) throw new UnauthenticatedError('invalid credentials')

  if (!userActive)
    throw new UnauthenticatedError('Account Disable, contact administrator')

  const token = createJWT({ userId: user.id, role: user.role }) // !!!!!!!!!!!!!!!!!!

  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production'
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged in' })
}

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}
