import express from 'express'

// Middlewares

// Controllers
import {
  createTest,
  test,
  loginTest,
  profileTest,
  logoutTest,
} from '../controllers/test.controller'

const router = express.Router()

router
  .get('/', test)

  .post('/create', createTest)

  .get('/login', loginTest)

  .get('/profile', profileTest)

  .get('/logout', logoutTest)

export default router
