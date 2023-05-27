import { ApiProperty } from '@nestjs/swagger';

export class CreateOrUpdateReviewDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  recommended: boolean;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  productId: number;
}
