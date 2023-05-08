import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors, UploadedFile, UploadedFiles,
  Res,
  HttpStatus,
  BadRequestException
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto.ts';
import { JwtAuthGuard } from './jwt/jwt-auth-guard';
import { diskStorage } from 'multer';
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
  ) { }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getOne({
      id
    });
  }

  @Get('/pdf/:id')
  async getPdfForUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.generatePdfForUser(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async createUser(@Body() user: CreateUserDto, @UploadedFile() file) {
    if(!file) throw new BadRequestException();

    const createdUser = await this.userService.findOrCreate({...user, image: file.path});
    const { accessToken } = await this.jwtAuthService.login(createdUser);
    

    return { user: createdUser, token: accessToken };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: UpdateUserDto) {

    return await this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {

    return await this.userService.deleteUser(id);
  }
}
