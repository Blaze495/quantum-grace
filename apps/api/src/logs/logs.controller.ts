import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LogsService } from './logs.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('logs')
@Controller('logs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LogsController {
  constructor(private logsService: LogsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all session logs' })
  async findAll(@Request() req, @Query() query: any) {
    return this.logsService.findAll(req.user.id, query);
  }

  @Post()
  @ApiOperation({ summary: 'Create a session log' })
  async create(@Body() body: any, @Request() req) {
    return this.logsService.create(req.user.id, body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a session log' })
  async update(@Param('id') id: string, @Body() body: any, @Request() req) {
    return this.logsService.update(id, req.user.id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a session log' })
  async delete(@Param('id') id: string, @Request() req) {
    return this.logsService.delete(id, req.user.id);
  }
}
