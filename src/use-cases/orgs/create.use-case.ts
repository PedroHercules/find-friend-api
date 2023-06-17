import { CreateOrgUseCaseProps, CreateOrgUseCaseResponse } from '@/@types/org'
import { OrgsRepository } from '@/repositories/orgs.repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org-already-exists'
import { PasswordNotMatchError } from '../errors/password-not-match'

export class CreateOrgUseCase {
  private orgsRepository: OrgsRepository
  constructor(orgsRepository: OrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async execute({
    name,
    email,
    address,
    password,
    confirmPassword,
    whatsapp,
    zipCode,
  }: CreateOrgUseCaseProps): Promise<CreateOrgUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)
    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    if (password !== confirmPassword) {
      throw new PasswordNotMatchError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      address,
      email,
      password: password_hash,
      whatsapp,
      zip_code: zipCode,
    })

    return {
      org,
    }
  }
}
