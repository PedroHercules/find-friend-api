import {
  CreatePetDatabase,
  FetchPetsByCityUseCaseProps,
  PetType,
} from '@/@types/pet'
import { PetsRepository } from '../pets.repository'
import { prisma } from '@/lib/prisma'
import { Decimal } from '@prisma/client/runtime'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: CreatePetDatabase) {
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
        pictures: {
          createMany: {
            data: data.pictures,
          },
        },
      },
    })

    return pet as PetType
  }

  async listAllByCity({
    city,
    page,
    energy,
    environment,
    size,
  }: FetchPetsByCityUseCaseProps) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        ...(energy && { energy }),
        ...(environment && { environment }),
        ...(size && { size }),
      },
      take: 12,
      skip: (page - 1) * 12,
    })

    return pets as PetType[]
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet as PetType
  }
}
