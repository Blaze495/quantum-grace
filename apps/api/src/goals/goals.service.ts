import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, data: any) {
    return this.prisma.goal.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async update(id: string, userId: string, data: any) {
    return this.prisma.goal.updateMany({
      where: { id, userId },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return this.prisma.goal.deleteMany({
      where: { id, userId },
    });
  }
}
