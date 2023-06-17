import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cachorro',
        address: 'Endereço teste',
        city: 'Teste City',
        description: 'Adote',
        energy: 5,
        environment: 'Amplo',
        size: 'Grande',
        state: 'Teste state',
        requirements: [
          {
            requirement: 'Cuidar bem',
          },
          {
            requirement: 'Dar banho ',
          },
        ],
        pictures: [
          {
            picture_url: 'https://image.png',
          },
          {
            picture_url: 'https://image2.png',
          },
        ],
      })

    expect(response.status).toEqual(201)
  })

  it('should not be able to create a pet without authorization', async () => {
    const response = await request(app.server)
      .post('/pets')
      .send({
        name: 'Cachorro',
        address: 'Endereço teste',
        city: 'Teste City',
        description: 'Adote',
        energy: 5,
        environment: 'Amplo',
        size: 'Grande',
        state: 'Teste state',
        requirements: [
          {
            requirement: 'Cuidar bem',
          },
          {
            requirement: 'Dar banho ',
          },
        ],
        pictures: [
          {
            picture_url: 'https://image.png',
          },
          {
            picture_url: 'https://image2.png',
          },
        ],
      })

    expect(response.status).toEqual(401)
  })
})
