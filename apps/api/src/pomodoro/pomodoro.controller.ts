import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PomodoroService } from './pomodoro.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('pomodoro')
@Controller('pomodoro')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PomodoroController {
  constructor(private pomodoroService: PomodoroService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start a pomodoro session' })
  async start(@Body() body: any, @Request() req: ExpressRequest) {
    return this.pomodoroService.start((req as any).user.id, body);
  }

  @Post('stop')
  @ApiOperation({ summary: 'Stop a pomodoro session' })
  async stop(@Body() body: any, @Request() req: ExpressRequest) {
    return this.pomodoroService.stop((req as any).user.id, body.sessionId);
  }

  @Post('save')
  @ApiOperation({ summary: 'Save completed pomodoro session' })
  async save(@Body() body: any, @Request() req: ExpressRequest) {
    return this.pomodoroService.save((req as any).user.id, body);
  }
}
