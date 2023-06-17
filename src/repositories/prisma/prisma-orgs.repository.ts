import { OrgType } from '@/@types/org'
import { OrgsRepository } from '../orgs.repository'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'node:crypto'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: OrgType) {
    const org = await prisma.org.create({
      data: {
        id: randomUUID(),
        ...data,
      },
    })

    return org
  }

  async findByEmail(email: string): Promise<OrgType | null> {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })

    return org
  }
}
