import express from 'express'

import { createTest, test, loginTest, profileTest, logoutTest } from '@/controllers/test.controller'
import authMiddleware from '@/middlewares/auth'

const router = express.Router()

router.get('/', authMiddleware, test)

router.post('/create', createTest)

router.get('/login', loginTest)

router.get('/profile', profileTest)

router.get('/logout', logoutTest)

export default router
