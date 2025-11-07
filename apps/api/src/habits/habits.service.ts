import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class HabitsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.habit.findMany({
      where: { userId, archived: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const habit = await this.prisma.habit.findFirst({
      where: { id, userId },
    });
    
    if (!habit) {
      throw new NotFoundException('Habit not found');
    }
    
    return habit;
  }

  async create(userId: string, data: Prisma.HabitCreateInput) {
    return this.prisma.habit.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  async update(id: string, userId: string, data: Prisma.HabitUpdateInput) {
    await this.findOne(id, userId);
    
    return this.prisma.habit.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId);
    
    return this.prisma.habit.delete({
      where: { id },
    });
  }

  async getStreak(id: string, userId: string) {
    await this.findOne(id, userId);
    
    // Get recent session logs for this habit
    const recentLogs = await this.prisma.sessionLog.findMany({
      where: {
        habitId: id,
        userId,
      },
      orderBy: { startedAt: 'desc' },
      take: 365,
    });

    // Calculate streak (simplified)
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      
      const hasLog = recentLogs.some(log => {
        const logDate = new Date(log.startedAt);
        logDate.setHours(0, 0, 0, 0);
        return logDate.getTime() === checkDate.getTime();
      });

      if (hasLog) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    return { streak, totalCompletions: recentLogs.length };
  }
}
