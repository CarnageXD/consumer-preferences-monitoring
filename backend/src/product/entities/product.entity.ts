import { RatingEntity } from '@rating/entities/rating.entity';
import { ReviewEntity } from '@review/entities/review.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

export enum ProductType {
  PROCESSED = 'processed',
  WEIGHTED = 'weighted',
  PACKAGED = 'packaged',
}

@Entity()
export class ProductEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  tag: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ProductType, default: ProductType.PACKAGED })
  type: 'processed' | 'weighted' | 'packaged';

  @Column()
  image: string;

  @Column()
  netWeight: string;

  @Column()
  packaging: string;

  @Column()
  form: string;

  @Column()
  periodAndTermsOfStorage: string;

  @OneToMany(() => RatingEntity, (rating) => rating.product)
  rating: RatingEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.product)
  review: ReviewEntity[];
}
