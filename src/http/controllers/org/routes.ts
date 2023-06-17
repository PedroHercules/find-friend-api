import { FastifyInstance } from 'fastify'
import { register } from './register.controller'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/', register)
}
