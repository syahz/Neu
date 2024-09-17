import supertest from 'supertest'
import { app } from '../src/application/web'
import { logger } from '../src/application/logging'

describe('POST /api/messages/send/:senderId/:receiverId', () => {
  it('should cannot send message to another user if request is invalid', async () => {
    const response = await supertest(app).post('/api/messages/send/76545067-391e-4f58-b083-4f8cb63aff41/21c9eec4-4899-4810-8043-38d1e897ac3f').send({
      message: ''
    })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  it('should can send message to another user', async () => {
    const response = await supertest(app).post('/api/messages/send/76545067-391e-4f58-b083-4f8cb63aff41/21c9eec4-4899-4810-8043-38d1e897ac3f').send({
      message: 'test dari user testtt'
    })

    logger.debug(response.body)
    expect(response.status).toBe(201)
  })
})

describe('GET /api/messages/:senderId/:receiverId', () => {
  it('should cannot get Messages from user if senderId and receiverId is same uuid', async () => {
    const response = await supertest(app).get('/api/messages/76545067-391e-4f58-b083-4f8cb63aff41/76545067-391e-4f58-b083-4f8cb63aff41')

    logger.debug(response.body)
    expect(response.status).toBe(400)
  })
  it('should get Messages from user', async () => {
    const response = await supertest(app).get('/api/messages/76545067-391e-4f58-b083-4f8cb63aff41/21c9eec4-4899-4810-8043-38d1e897ac3f')

    logger.debug(response.body)
    expect(response.status).toBe(200)
  })
})
