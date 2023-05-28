import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';

export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  questions: CreateQuestionDto[];
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  question: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsArray()
  @ApiProperty()
  options: string[];
}
