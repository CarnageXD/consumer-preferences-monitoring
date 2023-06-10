import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from './entities/user.entity';
import { CreateOrUpdateUserDto } from './dto/create.update.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async create(newUser: CreateOrUpdateUserDto) {
    const user = await this.repository.findOne({
      where: { email: newUser.email },
    });

    if (user) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const userToCreate = {
      ...newUser,
      password: hashedPassword,
    };

    const createdUser = await this.repository.save(userToCreate);

    const payload = {
      email: createdUser.email,
      role: createdUser.role,
      sub: createdUser.id,
    };
    const access_token = this.jwtService.sign(payload);

    return {
      user: {
        id: createdUser.id,
        firstName: newUser.firstName,
        email: newUser.email,
        lastName: newUser.lastName,
        role: newUser.role,
      },
      access_token: access_token,
    };
  }

  async validateUser(email: string, role: UserRole): Promise<any> {
    const user = await this.repository.findOne({
      where: { email, role },
    });

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
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

    const payload = { email: user.email, role: user.role, sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
