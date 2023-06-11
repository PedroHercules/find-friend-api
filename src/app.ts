import fastify from 'fastify'

export const app = fastify()

app.get('/', async () => {
  const appInfo = {
    name: 'Find a friend API',
    version: '0.0.1',
  }

  return appInfo
})
