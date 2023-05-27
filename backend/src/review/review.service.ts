import { Injectable } from '@nestjs/common';
import { CreateOrUpdateReviewDto } from './dto/create.update.review.dto';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '@product/entities/product.entity';
import { UserEntity } from '@users/entities/user.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private repository: Repository<ReviewEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createOrUpdate(review: CreateOrUpdateReviewDto) {
    const product = await this.productRepository.findOne({
      where: { id: review.productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: review.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.repository.save({
      content: review.content,
      recommended: review.recommended,
      product,
      user,
    });
  }

  findAll() {
    return this.repository.find({ relations: ['product', 'user'] });
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['product', 'user'],
    });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
