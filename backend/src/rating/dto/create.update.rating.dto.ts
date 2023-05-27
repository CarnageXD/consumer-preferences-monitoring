import { ApiProperty } from '@nestjs/swagger';
import { stringToNumber } from '@utils/stringToNumber';
import { Transform } from 'class-transformer';

export class CreateOrUpdateRatingDto {
  @ApiProperty()
  rating: string;

  @ApiProperty()
  @Transform(({ value }) => stringToNumber(value))
  userId: number;

  @Transform(({ value }) => stringToNumber(value))
  @ApiProperty()
  productId: number;
}
