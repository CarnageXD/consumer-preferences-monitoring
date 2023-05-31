import { Injectable } from '@nestjs/common';
import { CreateOrUpdateProductDto } from './dto/create.update.product.dto';
import { ProductEntity } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  create(product: CreateOrUpdateProductDto) {
    return this.repository.save(product);
  }

  findAll() {
    const options: FindManyOptions<ProductEntity> = {
      relations: ['review', 'rating'],
    };

    return this.repository.find(options);
  }

  findOne(tag: string) {
    const product = this.repository.findOne({
      where: {
        tag,
      },
      relations: ['review', 'rating', 'rating.user'],
    });

    return product;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async findAllWithRatings() {
    const products = await this.repository
      .createQueryBuilder('product')
      .select('product.id', 'id')
      .addSelect('product.*')
      .addSelect('AVG(CAST(rating.rating AS FLOAT))', 'averageRating')
      .addSelect('COUNT(rating.id)', 'ratingCount')
      .leftJoin('product.rating', 'rating')
      .groupBy('product.id')
      .getRawMany();

    return products.map((product) => ({
      ...product,
      ratingCount: Number(product.ratingCount),
    }));
  }
}
