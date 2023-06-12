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
  created_at: Date | string | undefined
  requirements: AdoptionRequirement[]
}

export type PetResponseType = {
  id: string
  name: string
  description: string
  energy: number
  environment: string
  size: string
  address: string
  city: string
  state: string
  org_id: string
  requirements: AdoptionRequirement[]
  created_at: Date | string | undefined

  org: OrgType
}

type AdoptionRequirement = {
  id: string
  requirement: string
  pet_id: string
}
