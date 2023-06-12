import { PetType } from '@/@types/pet'
import { PetsRepository } from '../pets.repository'
import { randomUUID } from 'crypto'

export class MemoryPetsRepository implements PetsRepository {
  public pets: PetType[] = []
  async create(data: PetType) {
    const pet = {
      id: randomUUID(),
      ...data,
    }

    this.pets.push(pet)

    return pet
  }

  async listAllByCity(city: string, page: number) {
    const pets = this.pets
      .filter((item) => item.city === city)
      .slice((page - 1) * 12, page * 12)
    return pets
  }

  async findById(id: string) {
    const pet = this.pets.find((item) => item.id === id)
    if (!pet) {
      return null
    }

    return pet
  }
}
