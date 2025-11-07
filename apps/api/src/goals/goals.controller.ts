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
  async findAll(@Request() req) {
    return this.goalsService.findAll(req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a goal' })
  async create(@Body() body: any, @Request() req) {
    return this.goalsService.create(req.user.id, body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a goal' })
  async update(@Param('id') id: string, @Body() body: any, @Request() req) {
    return this.goalsService.update(id, req.user.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a goal' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.goalsService.delete(id, req.user.id);
  }
}
