import { MemoryPetsRepository } from '@/repositories/in-memory/memory-pets.repository'
import { PetsRepository } from '@/repositories/pets.repository'
import { FetchPetsByCityUseCase } from '@/use-cases/pets/fetch-by-city.use-case'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: PetsRepository
let sut: FetchPetsByCityUseCase

describe('Fetch Pets By City Use Case', () => {
  beforeEach(() => {
    petsRepository = new MemoryPetsRepository()
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch pets by city', async () => {
    for (let i = 0; i < 12; i++) {
      await petsRepository.create({
        name: 'Pet Feliz',
        address: 'Rua Pet Feliz',
        city: 'Pet City',
        state: 'Pets',
        description: 'Pet feliz',
        energy: 5,
        environment: 'Amplo',
        size: 'Médio',
        org_id: 'org-1',
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
    }
    for (let i = 0; i < 2; i++) {
      await petsRepository.create({
        name: 'Pet Feliz',
        address: 'Rua Pet Feliz',
        city: 'Feliz City',
        state: 'Pets',
        description: 'Pet feliz',
        energy: 5,
        environment: 'Amplo',
        size: 'Médio',
        org_id: 'org-1',
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
    }

    const { pets } = await sut.execute({
      city: 'Feliz City',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        city: 'Feliz City',
      }),
      expect.objectContaining({
        city: 'Feliz City',
      }),
    ])
  })

  it('should be able to paginate pets list', async () => {
    for (let i = 0; i < 14; i++) {
      await petsRepository.create({
        name: 'Pet Feliz',
        address: 'Rua Pet Feliz',
        city: 'Pet City',
        state: 'Pets',
        description: 'Pet feliz',
        energy: 5,
        environment: 'Amplo',
        size: 'Médio',
        org_id: 'org-1',
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
    }

    const { pets } = await sut.execute({
      city: 'Pet City',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        city: 'Pet City',
      }),
      expect.objectContaining({
        city: 'Pet City',
      }),
    ])
  })
})
