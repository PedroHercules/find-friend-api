import { MemoryOrgsRepository } from '@/repositories/in-memory/memory-orgs.repository'
import { CreateOrgUseCase } from '@/use-cases/orgs/create.use-case'
import { describe, expect, it } from 'vitest'

const orgsRepository = new MemoryOrgsRepository()
const sut = new CreateOrgUseCase(orgsRepository)

describe('Create Org Use Case', () => {
  it('should be able to create a org', async () => {
    const { org } = await sut.execute({
      name: 'Pet Feliz',
      address: 'Rua Pet Feliz',
      zipCode: '65402100',
      email: 'petfeliz@email.com',
      password: '123456',
      whatsapp: '8989182912',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
