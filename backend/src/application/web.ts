import express from 'express'
import { publicRouter } from '../routes/public-api'
import { errorMiddleware } from '../middleware/error-middleware'
import { privateRouter } from '../routes/private-api'
import cors from 'cors'
export const app = express()

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

app.use(cors(corsOptions))

app.use(cors(corsOptions))

app.use(express.json())
app.use(publicRouter)
app.use(privateRouter)
app.use(errorMiddleware)
