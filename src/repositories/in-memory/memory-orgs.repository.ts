import { OrgType } from '@/@types/org'
import { OrgsRepository } from '../orgs.repository'

export class MemoryOrgsRepository implements OrgsRepository {
  public orgs: OrgType[] = []
  async create(data: OrgType) {
    const org: OrgType = {
      ...data,
    }

    this.orgs.push(org)

    return org
  }

  async findByEmail(email: string): Promise<OrgType | null> {
    const org = this.orgs.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string): Promise<OrgType | null> {
    const org = this.orgs.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }
}
