import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { orgRoutes } from './http/controllers/org/routes'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { petRoutes } from './http/controllers/pets/routes'

export const app = fastify()

// Register fastify JWT
app.register(fastifyJwt, {
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

// Register fastify cookies
app.register(fastifyCookie)

// register routes
app.register(orgRoutes, { prefix: '/orgs' })
app.register(petRoutes, { prefix: '/pets' })

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
