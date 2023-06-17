import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists'
import { PasswordNotMatchError } from '@/use-cases/errors/password-not-match'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    address: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    whatsapp: z.string(),
    zipCode: z.string(),
  })

  const body = registerOrgBodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    await createOrgUseCase.execute(body)

    return reply.status(201).send({
      message: 'Org created',
    })
  } catch (error) {
    if (error instanceof PasswordNotMatchError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
