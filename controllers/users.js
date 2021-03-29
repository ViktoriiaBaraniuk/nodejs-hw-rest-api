const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const fs = require('fs').promises
const path = require('path')
const Jimp = require('jimp')
const { HttpCode } = require('../helpers/constants')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

const createFolderIsExist = require('../helpers/create-dir')

const register = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await Users.findByEmail(email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'Email is in use',
      })
    }
    const newUser = await Users.create(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    })
  } catch (e) {
    next(e)
  }
}


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user?.validPassword(password)
    if (!user || !isValidPassword) {
   /*  if (!user || !user.validPassword(password)) */ 
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'UNAUTHORIZED',
        message: 'Email or password is wrong',
      })
    }
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(id, token)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
      },
    })
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  const id = req.user.id 
  await Users.updateToken(id, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}

const currentUser = async (req, res, next) => {
  try {
  const token = req.user.token
  const user = await Users.findByToken(token)
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      data: 'UNAUTHORIZED',
      message: 'Not authorized',
    })
}
return res.status(HttpCode.OK).json({
  status: 'success',
  code: HttpCode.OK,
  data: {
    email: user.email,
    subscription: user.subscription
  },
})
}
catch (e){
  next(e)
}
} 


/* const avatars = async (req, res, next) => {
  try {
    const id = req.user.id
    const AVATARS_OF_USERS =process.env.AVATARS_OF_USERS
    const pathFile = req.file.path
    const newNameAvatar = `${Date.now()}-${req.file.originalname}`
    const img = await Jimp.read(pathFile)
    await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile)
    await createFolderIsExist(path.join(AVATARS_OF_USERS, images, id))
    }
   catch (e) {
    next(e)
  }} */

module.exports = {
  register,
  login,
  logout,
  currentUser,
  /* avatars, */
} 
