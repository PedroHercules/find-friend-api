import { OrgType } from '@/@types/org'

export interface OrgsRepository {
  create(data: OrgType): Promise<OrgType>
  findByEmail(email: string): Promise<OrgType | null>
  findById(id: string): Promise<OrgType | null>
}
