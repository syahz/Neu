import { server } from './application/socket'
import { logger } from './application/logging'

const PORT = 4000

server.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`)
})
