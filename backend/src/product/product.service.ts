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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
