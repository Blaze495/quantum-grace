import { IsString, IsOptional, IsObject, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHabitDto {
  @ApiProperty({ example: 'Morning Meditation' })
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({ example: 'Practice mindfulness for 10 minutes', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: { frequency: 'daily', target: 1, days: [] },
    description: 'Habit schedule configuration',
  })
  @IsObject()
  schedule: Record<string, any>;

  @ApiProperty({ example: '08:00', required: false })
  @IsOptional()
  @IsString()
  reminderTime?: string;

  @ApiProperty({ example: '#6366f1', required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: '🧘', required: false })
  @IsOptional()
  @IsString()
  icon?: string;
}
