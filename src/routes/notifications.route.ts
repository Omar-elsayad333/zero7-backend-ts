import express from 'express'

// Controllers
import { findAll } from '../controllers/notification.controller'

const router = express.Router()

router.get('/', findAll)

export default router
