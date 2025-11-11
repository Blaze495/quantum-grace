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
import { HabitsService } from './habits.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@ApiTags('habits')
@Controller('habits')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class HabitsController {
  constructor(private habitsService: HabitsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user habits' })
  async findAll(@Request() req: ExpressRequest) {
    return this.habitsService.findAll((req as any).user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a habit by ID' })
  async findOne(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.habitsService.findOne(id, (req as any).user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new habit' })
  async create(@Body() createHabitDto: CreateHabitDto, @Request() req: ExpressRequest) {
    return this.habitsService.create((req as any).user.id, createHabitDto as any);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a habit' })
  async update(
    @Param('id') id: string,
    @Body() updateHabitDto: UpdateHabitDto,
    @Request() req,
  ) {
    return this.habitsService.update(id, (req as any).user.id, updateHabitDto as any);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a habit' })
  async delete(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.habitsService.delete(id, (req as any).user.id);
  }

  @Get(':id/streak')
  @ApiOperation({ summary: 'Get habit streak' })
  async getStreak(@Param('id') id: string, @Request() req: ExpressRequest) {
    return this.habitsService.getStreak(id, (req as any).user.id);
  }
}
