import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RatingModule } from './rating/rating.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { SurveyModule } from './survey/survey.module';
import { SurveyQuestionModule } from './survey-question/survey-question.module';
import { SurveyResponseModule } from './survey-response/survey-response.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
      entities: [
        './users/entities/user.entity.ts',
        './review/entities/review.entity.ts',
        './rating/entities/rating.entity.ts',
        './product/entities/product.entity.ts',
        './survey/entities/survey.entity.ts',
        './survey-question/entities/survey-question.entity.ts',
        './survey-response/entities/survey-response.entity.ts',
      ],
    }),
    UsersModule,
    RatingModule,
    ProductModule,
    ReviewModule,
    SurveyModule,
    SurveyQuestionModule,
    SurveyResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
