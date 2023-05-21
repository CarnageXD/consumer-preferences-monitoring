import { BaseEntity } from '@utils/entities/base.entity';
import { Entity, Column } from 'typeorm';

export enum UserRole {
  CLIENT = 'CLIENT',
  ANALYST = 'ANALYST',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: UserRole.CLIENT })
  role: UserRole;
}
