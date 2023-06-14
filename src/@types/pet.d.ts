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
  pictures: PetPictures[]
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
  pictures: PetPictures[]
}

export type CreatePetUseCaseResponse = {
  pet: PetType
}

type AdoptionRequirement = {
  id?: string
  requirement: string
  pet_id?: string
  pet?: PetType
}

type PetPictures = {
  id?: string
  picture_url: string
  pet_id?: string
  pet?: PetType
}

export type FetchPetsByCityUseCaseProps = {
  city: string
  page: number
}
