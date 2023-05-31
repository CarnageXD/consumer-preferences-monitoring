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

  async createOrUpdate(newReview: CreateOrUpdateReviewDto) {
    const product = await this.productRepository.findOne({
      where: { id: newReview.productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: newReview.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const dataToSave = {
      name: newReview.name,
      content: newReview.content,
      recommended: newReview.recommended,
      product,
      user,
    };

    return this.repository.save(dataToSave);
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

  async remove(id: number) {
    this.repository.delete(id);

    return { id };
  }
}
