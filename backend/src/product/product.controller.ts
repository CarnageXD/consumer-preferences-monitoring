import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateOrUpdateProductDto } from './dto/create.update.product.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateOrUpdateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
