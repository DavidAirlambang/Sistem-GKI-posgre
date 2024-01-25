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
  const query = {
    orderBy: { id: 'desc' },
    where: {}
  }

  if (req.body.role && req.body.role !== 'All') {
    query.where.role = req.body.role
  }
  if (req.body.status && req.body.status !== 'All') {
    req.body.status = req.body.status === 'Active' ? true : false
    query.where.active = req.body.status
  }

  try {
    const user = await prisma.user.findMany(query)
    res.status(StatusCodes.OK).json({ user })
  } catch (error) {
    console.error('Error fetching user:', error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' })
  }
}

export const getUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) }
  })
  res.status(StatusCodes.OK).json({ user })
}

export const roleUser = async (req, res) => {
  const user = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data: req.body
  })
  res.status(StatusCodes.OK).json({ user })
}

export const resetPassword = async (req, res) => {
  const user = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data: { password: await hashPassword('gkitamancibunut') }
  })
  res.status(StatusCodes.OK).json({ user })
}

export const deleteUser = async (req, res) => {
  const user = await prisma.user.delete({
    where: { id: parseInt(req.params.id) }
  })
  res.status(StatusCodes.OK).json({ user })
}

export const editUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email }
    })

    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'User not found' })
    }

    if (req.body.oldPassword && req.body.newPassword) {
      const isValidUser = await comparePassword(
        req.body.oldPassword,
        user.password
      )
      if (!isValidUser) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: 'password lama salah' })
      }

      const hashedPassword = await hashPassword(req.body.newPassword)
      await prisma.user.update({
        where: { email: req.body.email },
        data: { password: hashedPassword, name: req.body.name }
      })
    } else {
      await prisma.user.update({
        where: { email: req.body.email },
        data: req.body
      })
    }

    res.status(StatusCodes.OK).json({ user })
  } catch (error) {
    console.error('Error updating user:', error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: 'Internal Server Error' })
  }
}

export const login = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email }
  })

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password))

  const userActive = isValidUser && user.active === true

  if (!isValidUser) throw new UnauthenticatedError('Invalid credentials')

  if (!userActive)
    throw new UnauthenticatedError('Account disable, contact administrator')

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
