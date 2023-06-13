import { PetType } from '@/@types/pet'
import { PetsRepository } from '../pets.repository'
import { randomUUID } from 'crypto'
import { OrgType } from '@/@types/org'

export class MemoryPetsRepository implements PetsRepository {
  public pets: PetType[] = []

  public org: OrgType = {
    id: 'org-1',
    name: 'Org Feliz',
    address: 'Rua Org Feliz',
    email: 'org@email.com',
    whatsapp: '89920809',
    password: '12345',
    zip_code: '663783689',
  }

  async create(data: PetType) {
    const petId = randomUUID()

    const requirements = data.requirements.map((req) => {
      return {
        id: petId,
        requirement: req.requirement,
        pet_id: petId,
      }
    })

    const pet = {
      id: randomUUID(),
      ...data,
      requirements,
      org: this.org,
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
