import { OrgType } from './org'

export type PetType = {
  id?: string
  name: string
  description: string
  energy: number
  environment: string
  size: string
  address: string
  city: string
  state: string
  org_id: string
  created_at: Date | string | undefined

  org: OrgType
}
