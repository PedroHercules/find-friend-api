import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { FetchPetsByCityUseCase } from '../pets/fetch-by-city.use-case'

export function makeFetchPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsByCityUseCase(petsRepository)

  return useCase
}
