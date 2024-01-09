import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { error } from 'console';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param(':id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new Error('User Not Found');
    } else return user;
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.create(user);
  }

  @Put(':id')
  async update(@Param(':id') id: number, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param(':id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new Error('User Not found!');
    } else {
      return await this.usersService.delete(id);
    }
  }
}
