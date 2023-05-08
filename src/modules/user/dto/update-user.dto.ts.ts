
import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserResponse {
  user: User;
}
