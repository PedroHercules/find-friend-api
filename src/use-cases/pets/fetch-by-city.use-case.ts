import { FetchPetsByCityUseCaseProps } from '@/@types/pet'
import { PetsRepository } from '@/repositories/pets.repository'

export class FetchPetsByCityUseCase {
  private petsRepository: PetsRepository
  constructor(petsRepository: PetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute({
    city,
    page,
    energy,
    environment,
    size,
  }: FetchPetsByCityUseCaseProps) {
    const pets = await this.petsRepository.listAllByCity({
      city,
      energy,
      environment,
      page,
      size,
    })

    return {
      pets,
    }
  }
}
