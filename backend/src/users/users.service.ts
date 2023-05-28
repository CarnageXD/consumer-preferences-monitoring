import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateOrUpdateUserDto } from './dto/create.update.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(newUser: CreateOrUpdateUserDto) {
    const user = await this.repository.findOne({
      where: { email: newUser.email },
    });

    if (user) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const userToCreate = {
      ...newUser,
      password: hashedPassword,
    };

    this.repository.save(userToCreate);

    return {
      id: user.id,
      firstName: newUser.firstName,
      email: newUser.email,
      lastName: newUser.lastName,
      role: newUser.role,
    };
  }

  async login(credentials: LoginUserDto) {
    const user = await this.repository.findOne({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      lastName: user.lastName,
      role: user.role,
    };
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
