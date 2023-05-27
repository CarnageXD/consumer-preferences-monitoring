import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateOrUpdateRatingDto } from './dto/create.update.rating.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('rating')
@ApiTags('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  createOrUpdate(@Body() rating: CreateOrUpdateRatingDto) {
    return this.ratingService.createOrUpdate(rating);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingService.remove(+id);
  }

  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingService.findOne(+id);
  }
}
