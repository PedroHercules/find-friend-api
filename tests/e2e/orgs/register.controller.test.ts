import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Pet Happy',
      email: 'happy@email.com',
      password: 'teste123',
      confirmPassword: 'teste123',
      address: 'Happy City',
      whatsapp: '89898998899',
      zipCode: '878979878979898',
    })

    expect(response.status).toEqual(201)
  })
})
