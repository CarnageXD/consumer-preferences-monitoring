import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateOrUpdateProductDto } from './dto/create.update.product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateOrUpdateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('avgandcount')
  findAllWithAvgRatingsAndCount() {
    return this.productService.findAllWithRatings();
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':tag')
  findOne(@Param('tag') tag: string) {
    return this.productService.findOne(tag);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
