import { ProductEntity } from '@product/entities/product.entity';
import { UserEntity } from '@users/entities/user.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class RatingEntity extends BaseEntity {
  @Column({ type: 'real' })
  rating: string;

  @ManyToOne(() => ProductEntity, (product) => product.rating)
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.rating)
  user: UserEntity;
}
