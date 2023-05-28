import { SurveyQuestionEntity } from '@survey-question/entities/survey-question.entity';
import { SurveyEntity } from '@survey/entities/survey.entity';
import { UserEntity } from '@users/entities/user.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class SurveyResponseEntity extends BaseEntity {
  @ManyToOne(() => SurveyEntity, (survey) => survey.responses)
  survey: SurveyEntity;

  @ManyToOne(() => UserEntity, (user) => user.surveyResponses)
  user: UserEntity;

  @ManyToOne(() => SurveyQuestionEntity, (question) => question.surveyResponses)
  question: SurveyQuestionEntity;

  @Column('simple-array', { nullable: true })
  answers: string[];
}
