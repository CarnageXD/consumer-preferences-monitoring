import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateOrUpdateReviewDto } from './dto/create.update.review.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('review')
@ApiTags('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  createOrUpdate(@Body() review: CreateOrUpdateReviewDto) {
    return this.reviewService.createOrUpdate(review);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
