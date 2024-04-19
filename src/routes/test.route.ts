import express from 'express'

import { createTest, test, loginTest, profileTest, logoutTest } from '@/controllers/test.controller'

const router = express.Router()

router.get('/', test)

router.post('/create', createTest)

router.get('/login', loginTest)

router.get('/profile', profileTest)

router.get('/logout', logoutTest)

export default router
