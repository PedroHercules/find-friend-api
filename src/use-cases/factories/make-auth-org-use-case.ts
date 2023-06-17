import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { AuthenticateOrgUseCase } from '../orgs/authenticate.use-case'

export function makeAuthOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateOrgUseCase(orgsRepository)

  return useCase
}
