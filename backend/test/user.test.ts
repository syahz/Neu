import supertest from 'supertest'
import { UserTest } from './test-util'
import { app } from '../src/application/web'
import { logger } from '../src/application/logging'

describe('POST /api/users', () => {
  // afterEach(async () => {
  //   await UserTest.delete()
  // })

  it('should reject register new user if request is invalid', async () => {
    const response = await supertest(app).post('/api/users').send({
      username: '',
      password: '',
      name: ''
    })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  it('should register new user', async () => {
    const response = await supertest(app).post('/api/users').send({
      username: 'sumbulraya',
      password: 'test',
      confirmPassword: 'test',
      fullName: 'muhammad sumbul',
      gender: 'male'
    })

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.username).toBe('test')
  })
})

describe('POST /api/login', () => {
  it('should reject login user if request is invalid', async () => {
    const response = await supertest(app).post('/api/login').send({
      username: '',
      password: ''
    })

    logger.debug(response.body)
    expect(response.status).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  it('should login user', async () => {
    const response = await supertest(app).post('/api/login').send({
      username: 'test',
      password: 'test'
    })

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.username).toBe('test')
  })
})

describe('GET /api/users', () => {
  it('should get user', async () => {
    const response = await supertest(app).get('/api/users/76545067-391e-4f58-b083-4f8cb63aff41')

    logger.debug(response.body)
  })
})
