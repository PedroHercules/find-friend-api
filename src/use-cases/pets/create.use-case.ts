import { CreatePetUseCaseProps, CreatePetUseCaseResponse } from '@/@types/pet'
import { PetsRepository } from '@/repositories/pets.repository'

export class CreatePetUseCase {
  private petsRepository: PetsRepository
  constructor(petsRepository: PetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute({
    name,
    address,
    city,
    energy,
    description,
    environment,
    size,
    state,
    requirements,
    orgId,
    pictures,
  }: CreatePetUseCaseProps): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      address,
      city,
      description,
      energy,
      environment,
      size,
      state,
      requirements,
      org_id: orgId,
      pictures,
    })

    return {
      pet,
    }
  }
}
