import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PomodoroService {
  constructor(private prisma: PrismaService) {}

  async start(userId: string, data: any) {
    return { sessionId: 'temp-session-id', ...data };
  }

  async stop(userId: string, sessionId: string) {
    return { message: 'Pomodoro stopped', sessionId };
  }

  async save(userId: string, data: any) {
    const session = await this.prisma.pomodoroSession.create({
      data: {
        ...data,
        userId,
      },
    });

    // Also create a session log if requested
    if (data.createLog) {
      await this.prisma.sessionLog.create({
        data: {
          userId,
          category: 'Pomodoro',
          minutes: data.focusMinutes * data.cycles,
          startedAt: new Date(),
          endedAt: new Date(),
        },
      });
    }

    return session;
  }
}
