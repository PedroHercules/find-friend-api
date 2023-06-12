import { PetType } from '@/@types/pet'
import { PetsRepository } from '../pets.repository'
import { prisma } from '@/lib/prisma'
import { Decimal } from '@prisma/client/runtime'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: PetType) {
    const pet = await prisma.pet.create({
      data: {
        name: data.name,
        energy: new Decimal(data.energy.toString()),
        environment: data.environment,
        size: data.size,
        address: data.address,
        city: data.city,
        description: data.description,
        state: data.state,
        org_id: data.org_id,
        requirements: {
          createMany: {
            data: data.requirements,
          },
        },
      },
    })

    return pet
  }

  async listAllByCity(city: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
      },
      take: 12,
      skip: (page - 1) * 12,
    })

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}
