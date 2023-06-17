import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { authenticate } from './authenticate.controller'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/', register)
  app.post('/auth', authenticate)
}
