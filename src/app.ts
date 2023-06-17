import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { orgRoutes } from './http/controllers/org/routes'

export const app = fastify()

// register routes
app.register(orgRoutes, { prefix: '/orgs' })

// handling errors
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error: ',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({
    message: 'Internal server error',
    error: error.message,
  })
})

app.get('/', async () => {
  const appInfo = {
    name: 'Find a friend API',
    version: '0.0.1',
  }

  return appInfo
})
