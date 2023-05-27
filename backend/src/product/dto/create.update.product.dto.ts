import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@product/entities/product.entity';

export class CreateOrUpdateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  tag: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  type: ProductType;

  @ApiProperty()
  image: string;

  @ApiProperty()
  netWeight: string;

  @ApiProperty()
  packaging: string;

  @ApiProperty()
  form: string;

  @ApiProperty()
  periodAndTermsOfStorage: string;
}
