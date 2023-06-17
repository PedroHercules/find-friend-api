import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { authenticate } from './authenticate.controller'
import { refresh } from './refresh-token.controller'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/', register)
  app.post('/auth', authenticate)

  app.patch('/refresh-token', refresh)
}
