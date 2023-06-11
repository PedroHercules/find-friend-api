import { CreateOrgUseCaseProps } from '@/@types/org'
import { OrgsRepository } from '@/repositories/orgs.repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from '../errors/org-already-exists'

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
    whatsapp,
    zipCode,
  }: CreateOrgUseCaseProps) {
    const password_hash = await hash(password, 6)

    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)
    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

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
