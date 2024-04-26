import express from 'express'

// Middlewares
import authMiddleware from '@/middlewares/authMiddleware'

// Controllers
import { createTest, test, loginTest, profileTest, logoutTest } from '@/controllers/test.controller'

const router = express.Router()

router
  .get('/', authMiddleware, test)

  .post('/create', createTest)

  .get('/login', loginTest)

  .get('/profile', profileTest)

  .get('/logout', logoutTest)

export default router
