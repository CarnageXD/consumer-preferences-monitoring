import { ApiProperty } from '@nestjs/swagger';

export class CreateOrUpdateRatingDto {
  @ApiProperty()
  rating: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  productId: number;
}
