import { MemoryPetsRepository } from '@/repositories/in-memory/memory-pets.repository'
import { PetsRepository } from '@/repositories/pets.repository'
import { CreatePetUseCase } from '@/use-cases/pets/create.use-case'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: PetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new MemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      name: 'Pet Feliz',
      address: 'Rua Pet Feliz',
      city: 'Pet City',
      state: 'Pets',
      description: 'Pet feliz',
      energy: 5,
      environment: 'Amplo',
      size: 'Médio',
      orgId: 'org-1',
      requirements: [
        {
          requirement: 'Casa limpa',
        },
      ],
      pictures: [
        {
          picture_url: 'https://photo.jpg',
        },
        {
          picture_url: 'https://photo2.jpg',
        },
      ],
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
