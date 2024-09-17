import express from 'express'
import { publicRouter } from '../routes/public-api'
import { errorMiddleware } from '../middleware/error-middleware'
import { privateRouter } from '../routes/private-api'
import cors from 'cors'
export const app = express()

// Konfigurasi CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(publicRouter)
app.use(privateRouter)
app.use(errorMiddleware)
