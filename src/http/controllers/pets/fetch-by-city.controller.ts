import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchPetsParams = z.object({
    city: z.string(),
  })

  const fetchPetsQueryParams = z.object({
    page: z.coerce.number().optional().default(1),
    energy: z.coerce.number().optional(),
    environment: z.enum(['Pequeno', 'Médio', 'Amplo']).optional(),
    size: z.enum(['Pequeno', 'Médio', 'Grande']).optional(),
  })

  const { city } = fetchPetsParams.parse(request.params)
  const { page, size, energy, environment } = fetchPetsQueryParams.parse(
    request.query,
  )

  try {
    const fetchPetsUseCase = makeFetchPetsByCityUseCase()
    const { pets } = await fetchPetsUseCase.execute({
      city,
      page,
      energy,
      environment,
      size,
    })

    return reply.status(200).send({
      pets,
    })
  } catch (error) {
    console.log(error)
    throw new Error()
  }
}
