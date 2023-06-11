import { OrgType } from '@/@types/org'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: OrgType) {
    const org = await prisma.org.create({
      data,
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

  async findById(id: string): Promise<OrgType | null> {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })

    return org
  }
}
