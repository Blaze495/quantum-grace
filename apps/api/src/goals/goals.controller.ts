import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { GoalsService } from './goals.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('goals')
@Controller('goals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all goals' })
  async findAll(@Request() req: ExpressRequest) {
    return this.goalsService.findAll((req as any).user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a goal' })
  async create(@Body() body: any, @Request() req: ExpressRequest) {
    return this.goalsService.create((req as any).user.id, body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a goal' })
  async update(@Param('id') id: string, @Body() body: any, @Request() req: ExpressRequest) {
    return this.goalsService.update(id, (req as any).user.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a goal' })
  async delete(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.goalsService.delete(id, (req as any).user.id);
  }
}
