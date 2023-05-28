import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateOrUpdateUserDto } from './dto/create.update.user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  login(@Body() credentials: LoginUserDto) {
    return this.usersService.login(credentials);
  }

  @Post()
  create(@Body() user: CreateOrUpdateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
