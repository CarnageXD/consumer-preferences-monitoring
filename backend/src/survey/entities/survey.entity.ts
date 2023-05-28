import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@utils/entities/base.entity';
import { SurveyQuestionEntity } from '@survey-question/entities/survey-question.entity';
import { SurveyResponseEntity } from '@survey-response/entities/survey-response.entity';

@Entity()
export class SurveyEntity extends BaseEntity {
  @Column()
  title: string;

  @OneToMany(() => SurveyQuestionEntity, (question) => question.survey)
  questions: SurveyQuestionEntity[];

  @OneToMany(() => SurveyResponseEntity, (response) => response.survey)
  responses: SurveyResponseEntity[];
}
