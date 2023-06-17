import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch Pets By City (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets by city', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cachorro',
        address: 'Endereço teste',
        city: 'Teste Cachorro City',
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gato',
        address: 'Endereço teste',
        city: 'Teste Gato City',
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

    const response = await request(app.server)
      .get('/pets/Teste Gato City')
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to filter pets by size and environment', async () => {
    const { token } = await createAndAuthenticateOrg(app, 'pet2@email.com')

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Cachorro',
        address: 'Endereço teste',
        city: 'City',
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gato',
        address: 'Endereço teste',
        city: 'City',
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gato',
        address: 'Endereço teste',
        city: 'City',
        description: 'Adote',
        energy: 5,
        environment: 'Pequeno',
        size: 'Pequeno',
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

    const response = await request(app.server)
      .get('/pets/City?environment=Amplo&size=Grande')
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        environment: 'Amplo',
        size: 'Grande',
      }),
      expect.objectContaining({
        environment: 'Amplo',
        size: 'Grande',
      }),
    ])
  })
})
