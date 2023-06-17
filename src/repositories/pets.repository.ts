import { FetchPetsByCityUseCaseProps, PetType } from '@/@types/pet'

export interface PetsRepository {
  create(data: PetType): Promise<PetType>
  listAllByCity(filters: FetchPetsByCityUseCaseProps): Promise<PetType[]>
  findById(id: string): Promise<PetType | null>
}
