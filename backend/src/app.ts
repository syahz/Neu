import { config } from 'dotenv'
import { server } from './application/socket'
import { logger } from './application/logging'

config()

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`)
})
