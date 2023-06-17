import { PetsRepository } from '@/repositories/pets.repository'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export class GetPetByIdUseCase {
  private petsRepository: PetsRepository
  constructor(petsRepository: PetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute(id: string) {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
