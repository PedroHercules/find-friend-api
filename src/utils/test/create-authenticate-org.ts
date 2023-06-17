import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  email?: string,
) {
  await prisma.org.create({
    data: {
      name: 'PetHappy',
      email: email ?? 'pet@email.com',
      password: await hash('123456', 6),
      address: 'Org Rua',
      whatsapp: '8980988909',
      zip_code: '07898888978',
    },
  })

  const authResponse = await request(app.server).post('/orgs/auth').send({
    email: 'pet@email.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
