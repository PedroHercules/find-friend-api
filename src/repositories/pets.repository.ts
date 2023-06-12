import { PetType } from '@/@types/pet'

export interface PetsRepository {
  create(data: PetType): Promise<PetType>
  listAllByCity(city: string, page: number): Promise<PetType[]>
  findById(id: string): Promise<PetType | null>
}
