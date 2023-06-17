import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verifyJwt] }, create)
}
