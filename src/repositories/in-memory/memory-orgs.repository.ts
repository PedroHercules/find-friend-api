import { OrgType } from '@/@types/org'
import { OrgsRepository } from '../orgs.repository'
import { randomUUID } from 'node:crypto'

export class MemoryOrgsRepository implements OrgsRepository {
  public orgs: OrgType[] = []
  async create(data: OrgType) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      zip_code: data.zip_code,
      address: data.address,
      whatsapp: data.whatsapp,
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
}
