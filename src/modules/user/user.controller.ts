import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto.ts';
import { JwtAuthGuard } from './jwt/jwt-auth-guard';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { UserService } from './user.service';

@Controller({
  path: 'user',
  version: '1'
})
export class UserController {
  constructor(
    private userService: UserService,
    private jwtAuthService: JwtAuthService
  ) {}

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getOne({
      id
    });
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const createdUser = await this.userService.findOrCreate(user);
    const { accessToken } = await this.jwtAuthService.login(createdUser);
    console.log('tut');
    
    return { user: createdUser, token: accessToken };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: UpdateUserDto){
    
    return await this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string){
    
    return await this.userService.deleteUser(id);
  }
}
