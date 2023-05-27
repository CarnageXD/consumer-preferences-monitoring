import { ProductEntity } from '@product/entities/product.entity';
import { UserEntity } from '@users/entities/user.entity';
import { BaseEntity } from '@utils/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ReviewEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  content: string;

  @Column()
  recommended: boolean;

  @ManyToOne(() => ProductEntity, (product) => product.review)
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.review)
  user: UserEntity;
}
