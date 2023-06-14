import { Decimal } from '@prisma/client/runtime'
import { OrgType } from './org'

export type PetType = {
  id?: string
  name: string
  description: string
  energy: number | Decimal
  environment: string
  size: string
  address: string
  city: string
  state: string
  org_id: string
  created_at?: Date | string | undefined
  requirements: AdoptionRequirement[]
  org?: OrgType
}

export type CreatePetUseCaseProps = {
  name: string
  description: string
  energy: number | Decimal
  environment: string
  size: string
  address: string
  city: string
  state: string
  orgId: string
  requirements: AdoptionRequirement[]
}

export type CreatePetUseCaseResponse = {
  pet: PetType
}

type AdoptionRequirement = {
  id?: string
  requirement: string
  pet_id?: string
}

export type FetchPetsByCityUseCaseProps = {
  city: string
  page: number
}
