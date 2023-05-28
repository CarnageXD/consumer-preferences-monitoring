import { Module } from '@nestjs/common';
import { SurveyQuestionService } from './survey-question.service';
import { SurveyQuestionController } from './survey-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyQuestionEntity } from './entities/survey-question.entity';
import { SurveyEntity } from '@survey/entities/survey.entity';
import { SurveyResponseEntity } from '@survey-response/entities/survey-response.entity';

@Module({
  controllers: [SurveyQuestionController],
  providers: [SurveyQuestionService],
  imports: [
    TypeOrmModule.forFeature([
      SurveyQuestionEntity,
      SurveyEntity,
      SurveyResponseEntity,
    ]),
  ],
  exports: [SurveyQuestionService],
})
export class SurveyQuestionModule {}
