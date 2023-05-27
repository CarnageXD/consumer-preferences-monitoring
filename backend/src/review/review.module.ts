import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { ProductEntity } from '@product/entities/product.entity';
import { UserEntity } from '@users/entities/user.entity';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    TypeOrmModule.forFeature([ReviewEntity, ProductEntity, UserEntity]),
  ],
  exports: [ReviewService],
})
export class ReviewModule {}
