import { PetType } from './pet'

export type OrgType = {
  id?: string
  name: string
  email: string
  zip_code: string
  address: string
  whatsapp: string
  password: string

  pets?: PetType[]
}

export type CreateOrgUseCaseProps = {
  name: string
  email: string
  zipCode: string
  address: string
  whatsapp: string
  password: string
}
