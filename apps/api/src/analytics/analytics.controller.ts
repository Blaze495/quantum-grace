import { Controller, Get, UseGuards, Request } from '@nestjs/common';
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
  async getWeekly(@Request() req) {
    return this.analyticsService.getWeekly(req.user.id);
  }

  @Get('monthly')
  @ApiOperation({ summary: 'Get monthly analytics' })
  async getMonthly(@Request() req) {
    return this.analyticsService.getMonthly(req.user.id);
  }

  @Get('heatmap')
  @ApiOperation({ summary: 'Get activity heatmap data' })
  async getHeatmap(@Request() req) {
    return this.analyticsService.getHeatmap(req.user.id);
  }
}
