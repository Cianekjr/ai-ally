import { Injectable } from '@nestjs/common'
import { Prisma } from 'db'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ResultImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async createManyResultImages(data: Prisma.ResultImageCreateManyInput[]) {
    return this.prisma.resultImage.createMany({
      data,
      skipDuplicates: true,
    })
  }

  async getManyResultImages(content: string, { take = 20, cursor }: { take?: number; cursor?: number }) {
    const items = await this.prisma.resultImage.findMany({
      where: {
        content: {
          mode: 'insensitive',
          contains: content,
        },
      },
      take: -take,
      ...(cursor
        ? {
            skip: 1,
            cursor: {
              id: cursor,
            },
          }
        : {}),
      orderBy: {
        id: 'asc',
      },
    })

    return items
  }
}
