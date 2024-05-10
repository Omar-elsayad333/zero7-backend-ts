import { CorsOptions } from 'cors'

const corsConfig: CorsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true, // Allow cookies and credentials
}

export default corsConfig
