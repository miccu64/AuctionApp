import express from 'express'
import { registerUser, signInUser } from '../controllers/auth-controller.js'

export const authRouter = express.Router()

const basePath = '/auth/'

authRouter.post(`${basePath}login`, signInUser)
authRouter.post(`${basePath}register`, registerUser)
