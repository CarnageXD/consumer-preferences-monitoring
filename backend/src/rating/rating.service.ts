import { Injectable } from '@nestjs/common';
import { CreateOrUpdateRatingDto } from './dto/create.update.rating.dto';
import { RatingEntity } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@users/entities/user.entity';
import { ProductEntity } from '@product/entities/product.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private repository: Repository<RatingEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createOrUpdate(newRating: CreateOrUpdateRatingDto) {
    const product = await this.productRepository.findOne({
      where: { id: newRating.productId },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const user = await this.userRepository.findOne({
      where: { id: newRating.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const rating = await this.repository
      .createQueryBuilder('rating')
      .leftJoinAndSelect('rating.product', 'product')
      .leftJoinAndSelect('rating.user', 'user')
      .where('product.id = :productId', { productId: newRating.productId })
      .andWhere('user.id = :userId', { userId: newRating.userId })
      .getOne();

    const dataToSave = {
      rating: newRating.rating,
      product,
      user,
    };

    if (rating) {
      rating.rating = newRating.rating;
      return this.repository.save(rating);
    }

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

  remove(id: number) {
    return this.repository.delete(id);
  }
}
