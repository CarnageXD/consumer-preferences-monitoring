import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyQuestionEntity } from '@survey-question/entities/survey-question.entity';
import { SurveyResponseEntity } from '@survey-response/entities/survey-response.entity';
import { SurveyEntity } from './entities/survey.entity';

@Module({
  controllers: [SurveyController],
  providers: [SurveyService],
  imports: [
    TypeOrmModule.forFeature([
      SurveyEntity,
      SurveyQuestionEntity,
      SurveyResponseEntity,
    ]),
  ],
  exports: [SurveyService],
})
export class SurveyModule {}
