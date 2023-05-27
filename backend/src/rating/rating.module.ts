import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingEntity } from './entities/rating.entity';
import { ProductEntity } from '@product/entities/product.entity';
import { UserEntity } from '@users/entities/user.entity';

@Module({
  controllers: [RatingController],
  providers: [RatingService],
  imports: [
    TypeOrmModule.forFeature([RatingEntity, ProductEntity, UserEntity]),
  ],
  exports: [RatingService],
})
export class RatingModule {}
