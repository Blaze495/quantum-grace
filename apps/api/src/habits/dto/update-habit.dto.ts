import { IsString, IsOptional, IsBoolean, IsObject, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHabitDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  schedule?: Record<string, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reminderTime?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  archived?: boolean;
}
