import fs from 'fs'
import dotenv from 'dotenv'

import logger from './logger'

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables')
  dotenv.config({ path: '.env' })
} else {
  logger.debug('Using .env.example file to supply config environment variables')
  dotenv.config({ path: '.env.example' }) // you can delete this after you create your own .env file!
}

export const ENVIRONMENT = process.env.NODE_ENV
export const isProd = ENVIRONMENT === 'production' // Anything else is treated as 'dev'

export const API_VERSION = isProd
  ? process.env['BASE_API_VERSION']
  : process.env['BASE_API_VERSION_LOCAL']

export const BASE_URL = isProd ? process.env['BASE_URL'] : process.env['BASE_URL_LOCAL']

export const CLIENT_ID = process.env['CLIENT_ID'] as string

export const SESSION_SECRET = process.env['SESSION_SECRET'] as string

export const JWT_SECRET = process.env['JWT_SECRET'] as string

export const FRONT_URL = (
  isProd ? process.env['FRONT_URL'] : process.env['FRONT_URL_LOCAL']
) as string

export const MONGODB_URI = (
  isProd ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL']
) as string

if (!SESSION_SECRET || !JWT_SECRET) {
  logger.error('No client secret. Set SESSION_SECRET or JWT_SECRET environment variable.')
  process.exit(1)
}

if (!MONGODB_URI) {
  if (isProd) {
    logger.error('No mongo connection string. Set MONGODB_URI environment variable.')
  } else {
    logger.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.')
  }
  process.exit(1)
}
