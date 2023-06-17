import { MemoryPetsRepository } from '@/repositories/in-memory/memory-pets.repository'
import { PetsRepository } from '@/repositories/pets.repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found'
import { GetPetByIdUseCase } from '@/use-cases/pets/get-pet-by-id.use-case'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: PetsRepository
let sut: GetPetByIdUseCase

describe('get Pet by Id Use Case', () => {
  beforeEach(() => {
    petsRepository = new MemoryPetsRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be able to get pet by id', async () => {
    const createdPet = await petsRepository.create({
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

    const { pet } = await sut.execute(createdPet.id)

    expect(pet.id).toEqual(expect.any(String))
    expect(pet).toEqual(
      expect.objectContaining({
        name: 'Pet Feliz',
        address: 'Rua Pet Feliz',
        city: 'Pet City',
      }),
    )
  })

  it('should be able to get pet by id', async () => {
    const promise = sut.execute('no-exists')
    await expect(promise).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
