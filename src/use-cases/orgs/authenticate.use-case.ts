import { OrgsRepository } from '@/repositories/orgs.repository'
import { compare } from 'bcryptjs'
import {
  AuthenticateOrgUseCaseProps,
  AuthenticateOrgUseCaseResponse,
} from '@/@types/org'
import { InvalidCredentialsError } from '../errors/invalid-credentials'

export class AuthenticateOrgUseCase {
  private orgsRepository: OrgsRepository
  constructor(orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseProps): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)
    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password)
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
