import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateOrUpdateUserDto } from './dto/create.update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  create(newUser: CreateOrUpdateUserDto) {
    const user = this.repository.findOne({ where: { email: newUser.email } });

    if (user) {
      return this.repository.save(newUser);
    }

    return this.repository.save(newUser);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: CreateOrUpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
