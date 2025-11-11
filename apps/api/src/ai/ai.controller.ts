import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('ai')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiController {
  constructor(private aiService: AiService) {}

  @Post('weekly-summary')
  @ApiOperation({ summary: 'Get AI-generated weekly summary' })
  async getWeeklySummary(@Request() req: ExpressRequest) {
    return this.aiService.getWeeklySummary((req as any).user.id);
  }

  @Post('coach')
  @ApiOperation({ summary: 'Chat with Quantum Coach' })
  async chat(@Body() body: { prompt: string }, @Request() req: ExpressRequest) {
    return this.aiService.chat((req as any).user.id, body.prompt);
  }
}
