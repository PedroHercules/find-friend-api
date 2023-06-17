import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { fetchByCity } from './fetch-by-city.controller'

export async function petRoutes(app: FastifyInstance) {
  app.get('/:city', fetchByCity)

  // Authenticated
  app.post('/', { onRequest: [verifyJwt] }, create)
}
