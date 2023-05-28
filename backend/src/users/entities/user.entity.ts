import { RatingEntity } from '@rating/entities/rating.entity';
import { ReviewEntity } from '@review/entities/review.entity';
import { SurveyResponseEntity } from '@survey-response/entities/survey-response.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';

export enum UserRole {
  CLIENT = 'CLIENT',
  ANALYST = 'ANALYST',
  ADMIN = 'ADMIN',
}

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  @OneToMany(() => RatingEntity, (rating) => rating.product)
  rating: RatingEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product)
  review: ReviewEntity[];

  @OneToMany(() => SurveyResponseEntity, (response) => response.question)
  surveyResponses: SurveyResponseEntity[];
}
