import { Module } from '@nestjs/common';
import { SurveyResponseService } from './survey-response.service';
import { SurveyResponseController } from './survey-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyResponseEntity } from './entities/survey-response.entity';
import { SurveyQuestionEntity } from '@survey-question/entities/survey-question.entity';
import { UserEntity } from '@users/entities/user.entity';
import { SurveyEntity } from '@survey/entities/survey.entity';

@Module({
  controllers: [SurveyResponseController],
  providers: [SurveyResponseService],
  imports: [
    TypeOrmModule.forFeature([
      SurveyResponseEntity,
      SurveyQuestionEntity,
      SurveyEntity,
      UserEntity,
    ]),
  ],
  exports: [SurveyResponseService],
})
export class SurveyResponseModule {}
