import { HttpStatus, INestApplication } from '@nestjs/common'
import { ApplicationFactory } from 'src/application.factory'
import { User } from 'src/user/core/user.domain'
import * as request from 'supertest'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await ApplicationFactory.createTester()
    await app.init()
  })

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ email: 'mock@mock.com', id: 0, nickname: 'hi', password: 'there' } as User)
      .expect(HttpStatus.CREATED)
  })
})
