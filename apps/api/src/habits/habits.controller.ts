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
  async findAll(@Request() req) {
    return this.habitsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a habit by ID' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.habitsService.findOne(id, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new habit' })
  async create(@Body() createHabitDto: CreateHabitDto, @Request() req) {
    return this.habitsService.create(req.user.id, createHabitDto as any);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a habit' })
  async update(
    @Param('id') id: string,
    @Body() updateHabitDto: UpdateHabitDto,
    @Request() req,
  ) {
    return this.habitsService.update(id, req.user.id, updateHabitDto as any);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a habit' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.habitsService.delete(id, req.user.id);
  }

  @Get(':id/streak')
  @ApiOperation({ summary: 'Get habit streak' })
  async getStreak(@Param('id') id: string, @Request() req) {
    return this.habitsService.getStreak(id, req.user.id);
  }
}
