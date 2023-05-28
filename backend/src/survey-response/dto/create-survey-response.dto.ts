import { ApiProperty } from '@nestjs/swagger';

export class ResponseItemDto {
  @ApiProperty()
  questionId: number;

  @ApiProperty()
  answers: string[];
}

export class CreateSurveyResponseDto {
  @ApiProperty()
  surveyId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty({ type: [ResponseItemDto] })
  responses: ResponseItemDto[];
}
