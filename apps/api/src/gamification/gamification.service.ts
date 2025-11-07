import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  async getStreaks(userId: string) {
    // Calculate global streak
    const logs = await this.prisma.sessionLog.findMany({
      where: { userId },
      orderBy: { startedAt: 'desc' },
      take: 365,
    });

    let globalStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);

      const hasLog = logs.some((log) => {
        const logDate = new Date(log.startedAt);
        logDate.setHours(0, 0, 0, 0);
        return logDate.getTime() === checkDate.getTime();
      });

      if (hasLog) {
        globalStreak++;
      } else if (i > 0) {
        break;
      }
    }

    return { globalStreak, totalDays: logs.length };
  }

  async getBadges(userId: string) {
    const userBadges = await this.prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
    });

    const allBadges = await this.prisma.badge.findMany();

    return {
      earned: userBadges,
      available: allBadges,
    };
  }

  async getLeaderboard() {
    const users = await this.prisma.user.findMany({
      where: { isPublic: true },
      select: {
        id: true,
        name: true,
        xp: true,
        level: true,
      },
      orderBy: { xp: 'desc' },
      take: 100,
    });

    return users;
  }
}
