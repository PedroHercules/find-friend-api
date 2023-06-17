import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    description: z.string().max(250),
    energy: z.number().int().gte(1).lte(5),
    environment: z.enum(['Pequeno', 'Médio', 'Amplo']),
    size: z.enum(['Pequeno', 'Médio', 'Grande']),
    state: z.string(),
    requirements: z.array(
      z.object({
        requirement: z.string().max(150),
      }),
    ),
    pictures: z.array(
      z.object({
        picture_url: z.string(),
      }),
    ),
  })

  const body = createPetBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      ...body,
      orgId: request.user.sub,
    })

    return reply.status(201).send({
      message: 'Pet created',
    })
  } catch (error) {
    console.error(error)
    throw new Error()
  }
}
