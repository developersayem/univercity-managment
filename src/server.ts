import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error('uncaught Expectation Detected')
  process.exit(1)
})

let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`🛢   Database is connected successfully`)

    server = app.listen(config.port, () => {
      logger.info(`Application  listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database', error)
  }
  // eslint-disable-next-line no-unused-vars
  process.on('unhandledRejection', error => {
    errorLogger.error('unhandledRejection', 'server is closing')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
        errorLogger.error('server is closed')
      })
    } else {
      process.exit(1)
    }
  })
}

main()

process.on('SIGTERM', () => {
  logger.info('SIGTERM Received')
  if (server) {
    server.close()
  }
})
