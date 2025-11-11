import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('gamification')
@Controller()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GamificationController {
  constructor(private gamificationService: GamificationService) {}

  @Get('streaks')
  @ApiOperation({ summary: 'Get user streaks' })
  async getStreaks(@Request() req: ExpressRequest) {
    return this.gamificationService.getStreaks((req as any).user.id);
  }

  @Get('badges')
  @ApiOperation({ summary: 'Get user badges' })
  async getBadges(@Request() req: ExpressRequest) {
    return this.gamificationService.getBadges((req as any).user.id);
  }

  @Get('leaderboard')
  @ApiOperation({ summary: 'Get global leaderboard' })
  async getLeaderboard() {
    return this.gamificationService.getLeaderboard();
  }
}
