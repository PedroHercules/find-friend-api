import { MemoryOrgsRepository } from '@/repositories/in-memory/memory-orgs.repository'
import { OrgsRepository } from '@/repositories/orgs.repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists'
import { PasswordNotMatchError } from '@/use-cases/errors/password-not-match'
import { CreateOrgUseCase } from '@/use-cases/orgs/create.use-case'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

let orgsRepository: OrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new MemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create a org', async () => {
    const { org } = await sut.execute({
      name: 'Pet Feliz',
      address: 'Rua Pet Feliz',
      zipCode: '65402100',
      email: 'petfeliz@email.com',
      password: '123456',
      confirmPassword: '123456',
      whatsapp: '8989182912',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Pet Feliz',
      address: 'Rua Pet Feliz',
      zipCode: '65402100',
      email: 'petfeliz@email.com',
      password: '123456',
      confirmPassword: '123456',
      whatsapp: '8989182912',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password)

    expect(isPasswordCorrectlyHashed).toEqual(true)
  })

  it('should not be able create org with same e-mail twice', async () => {
    await sut.execute({
      name: 'Pet Feliz',
      address: 'Rua Pet Feliz',
      zipCode: '65402100',
      email: 'petfeliz@email.com',
      password: '123456',
      confirmPassword: '123456',
      whatsapp: '8989182912',
    })

    const createOrgPromise = sut.execute({
      name: 'Pet Feliz',
      address: 'Rua Pet Feliz',
      zipCode: '65402100',
      email: 'petfeliz@email.com',
      password: '123456',
      confirmPassword: '123456',
      whatsapp: '8989182912',
    })

    await expect(createOrgPromise).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should not be able create org with wrong confirm password', async () => {
    const createOrgPromise = sut.execute({
      name: 'Pet Feliz',
      address: 'Rua Pet Feliz',
      zipCode: '65402100',
      email: 'petfeliz@email.com',
      password: '123456',
      confirmPassword: '12345689',
      whatsapp: '8989182912',
    })

    await expect(createOrgPromise).rejects.toBeInstanceOf(PasswordNotMatchError)
  })
})
