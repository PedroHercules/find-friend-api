import { MemoryOrgsRepository } from '@/repositories/in-memory/memory-orgs.repository'
import { OrgsRepository } from '@/repositories/orgs.repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'
import { AuthenticateOrgUseCase } from '@/use-cases/orgs/authenticate.use-case'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

let orgsRepository: OrgsRepository
let sut: AuthenticateOrgUseCase

async function createOrg() {
  return await orgsRepository.create({
    name: 'Pet Feliz',
    address: 'Rua Pet Feliz',
    zip_code: '65402100',
    email: 'petfeliz@email.com',
    password: await hash('123456', 6),
    whatsapp: '8989182912',
  })
}

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new MemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate a org', async () => {
    await createOrg()

    const { org } = await sut.execute({
      email: 'petfeliz@email.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate inexistent org', async () => {
    const responsePromise = sut.execute({
      email: 'petfeliz@email.com',
      password: '123456',
    })

    await expect(responsePromise).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await createOrg()

    const responsePromise = sut.execute({
      email: 'wrong@email.com',
      password: '123456',
    })

    await expect(responsePromise).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })

  it('should not be able to authenticate with wrong e-mail', async () => {
    await createOrg()

    const responsePromise = sut.execute({
      email: 'petfeliz@email.com',
      password: '654321',
    })

    await expect(responsePromise).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })
})
