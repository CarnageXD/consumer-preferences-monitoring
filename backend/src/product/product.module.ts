import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { RatingEntity } from '@rating/entities/rating.entity';
import { ReviewEntity } from '@review/entities/review.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([ProductEntity, RatingEntity, ReviewEntity]),
  ],
  exports: [ProductService],
})
export class ProductModule {}
