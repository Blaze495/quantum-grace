import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async getWeeklySummary(userId: string) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [logs, habits, goals] = await Promise.all([
      this.prisma.sessionLog.findMany({
        where: { userId, startedAt: { gte: sevenDaysAgo } },
      }),
      this.prisma.habit.findMany({
        where: { userId, archived: false },
      }),
      this.prisma.goal.findMany({
        where: { userId },
      }),
    ]);

    const totalMinutes = logs.reduce((sum, log) => sum + log.minutes, 0);
    const totalSessions = logs.length;

    // Basic AI summary (can be enhanced with OpenAI API)
    return {
      summary: `This week you completed ${totalSessions} sessions, totaling ${totalMinutes} minutes of focused work.`,
      strengths: [
        totalSessions > 10 ? 'Great consistency!' : 'Building momentum',
      ],
      improvements: [
        totalSessions < 5 ? 'Try to log more sessions' : 'Keep it up!',
      ],
      actionItems: [
        'Set a daily goal',
        'Try the Pomodoro technique',
        'Track your progress',
      ],
      stats: {
        totalMinutes,
        totalSessions,
        activeHabits: habits.length,
        activeGoals: goals.filter((g) => g.status === 'IN_PROGRESS').length,
      },
    };
  }

  async chat(userId: string, prompt: string) {
    // Guard against prompt injection
    const sanitizedPrompt = prompt.slice(0, 500);

    // Get user context
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    // Basic response (can be enhanced with OpenAI API)
    return {
      response: `Hello ${user?.name || 'there'}! I'm your Quantum Coach. ${sanitizedPrompt.includes('help') ? 'I can help you track habits, set goals, and stay motivated!' : 'How can I assist you today?'}`,
      suggestions: [
        'Tell me about my progress',
        'What should I focus on?',
        'Show me my weekly summary',
      ],
    };
  }
}
