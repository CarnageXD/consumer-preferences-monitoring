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
    const productsWithRatings = await this.repository
      .createQueryBuilder('product')
      .select('product')
      .leftJoinAndSelect('product.rating', 'rating')
      .getMany();

    const productsWithAvgRatings = await this.repository
      .createQueryBuilder('product')
      .select('product.id', 'id')
      .addSelect('product.*')
      .addSelect('AVG(CAST(rating.rating AS FLOAT))', 'averageRating')
      .addSelect('COUNT(rating.id)', 'ratingCount')
      .leftJoin('product.rating', 'rating')
      .groupBy('product.id')
      .getRawMany();

    // Соединяем данные
    const products = productsWithAvgRatings.map((product) => {
      const productWithRatings = productsWithRatings.find(
        (p) => p.id === product.id,
      );
      return {
        ...product,
        rating: productWithRatings ? productWithRatings.rating : [],
        ratingCount: Number(product.ratingCount),
      };
    });

    return products;
  }
}
