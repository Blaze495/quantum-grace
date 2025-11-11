import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('weekly')
  @ApiOperation({ summary: 'Get weekly analytics' })
  async getWeekly(@Request() req: ExpressRequest) {
    return this.analyticsService.getWeekly((req as any).user.id);
  }

  @Get('monthly')
  @ApiOperation({ summary: 'Get monthly analytics' })
  async getMonthly(@Request() req: ExpressRequest) {
    return this.analyticsService.getMonthly((req as any).user.id);
  }

  @Get('heatmap')
  @ApiOperation({ summary: 'Get activity heatmap data' })
  async getHeatmap(@Request() req: ExpressRequest) {
    return this.analyticsService.getHeatmap((req as any).user.id);
  }
}
