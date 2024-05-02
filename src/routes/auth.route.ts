import express from 'express'
import passport from 'passport'

// Controllers
import { google, login, signup, verfiy } from '@/controllers/auth.controller'

const router = express.Router()

router
  .post('/login', login)

  .post('/signup', signup)

  .get('/verfiy/:email/:token', verfiy)

  .get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

  .get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
    google,
  )

export default router
