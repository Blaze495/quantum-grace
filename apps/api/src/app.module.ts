import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HabitsModule } from './habits/habits.module';
import { LogsModule } from './logs/logs.module';
import { GoalsModule } from './goals/goals.module';
import { PomodoroModule } from './pomodoro/pomodoro.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { GamificationModule } from './gamification/gamification.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    HabitsModule,
    LogsModule,
    GoalsModule,
    PomodoroModule,
    AnalyticsModule,
    GamificationModule,
    AiModule,
  ],
})
export class AppModule {}
