import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getWeekly(userId: string) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const logs = await this.prisma.sessionLog.findMany({
      where: {
        userId,
        startedAt: { gte: sevenDaysAgo },
      },
    });

    const totalMinutes = logs.reduce((sum, log) => sum + log.minutes, 0);
    const totalSessions = logs.length;

    return {
      period: 'week',
      totalMinutes,
      totalSessions,
      avgMinutesPerDay: Math.round(totalMinutes / 7),
      logs,
    };
  }

  async getMonthly(userId: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const logs = await this.prisma.sessionLog.findMany({
      where: {
        userId,
        startedAt: { gte: thirtyDaysAgo },
      },
    });

    const totalMinutes = logs.reduce((sum, log) => sum + log.minutes, 0);
    const totalSessions = logs.length;

    return {
      period: 'month',
      totalMinutes,
      totalSessions,
      avgMinutesPerDay: Math.round(totalMinutes / 30),
      logs,
    };
  }

  async getHeatmap(userId: string) {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const logs = await this.prisma.sessionLog.findMany({
      where: {
        userId,
        startedAt: { gte: oneYearAgo },
      },
    });

    // Group by date
    const heatmapData: Record<string, number> = {};
    logs.forEach((log) => {
      const date = log.startedAt.toISOString().split('T')[0];
      heatmapData[date] = (heatmapData[date] || 0) + log.minutes;
    });

    return heatmapData;
  }
}
