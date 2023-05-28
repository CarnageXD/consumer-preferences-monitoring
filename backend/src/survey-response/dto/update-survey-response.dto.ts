import { ApiProperty } from '@nestjs/swagger';

export class UpdateSurveyResponseDto {
  @ApiProperty()
  answers: string[];
}
