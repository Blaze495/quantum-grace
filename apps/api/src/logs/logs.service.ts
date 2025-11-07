import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, filters: any = {}) {
    const { from, to, habitId, category } = filters;
    
    return this.prisma.sessionLog.findMany({
      where: {
        userId,
        ...(habitId && { habitId }),
        ...(category && { category }),
        ...(from && to && {
          startedAt: {
            gte: new Date(from),
            lte: new Date(to),
          },
        }),
      },
      include: {
        habit: true,
      },
      orderBy: { startedAt: 'desc' },
    });
  }

  async create(userId: string, data: any) {
    return this.prisma.sessionLog.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async update(id: string, userId: string, data: any) {
    return this.prisma.sessionLog.updateMany({
      where: { id, userId },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return this.prisma.sessionLog.deleteMany({
      where: { id, userId },
    });
  }
}
