import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Pet Happy',
      email: 'happy@email.com',
      password: 'teste123',
      confirmPassword: 'teste123',
      address: 'Happy City',
      whatsapp: '89898998899',
      zipCode: '878979878979898',
    })

    const authResponse = await request(app.server).post('/orgs/auth').send({
      email: 'happy@email.com',
      password: 'teste123',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/orgs/refresh-token')
      .set('Cookie', cookies)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.token).toEqual(expect.any(String))
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
