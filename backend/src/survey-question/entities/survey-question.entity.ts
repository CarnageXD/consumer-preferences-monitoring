import { SurveyEntity } from '@survey/entities/survey.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { SurveyResponseEntity } from '@survey-response/entities/survey-response.entity';

@Entity()
export class SurveyQuestionEntity extends BaseEntity {
  @Column()
  question: string;

  @Column()
  type: string;

  @Column('simple-array', { nullable: true })
  options: string[];

  @ManyToOne(() => SurveyEntity, (survey) => survey.questions)
  survey: SurveyEntity;

  @OneToMany(() => SurveyResponseEntity, (response) => response.question)
  surveyResponses: SurveyResponseEntity[];
}
