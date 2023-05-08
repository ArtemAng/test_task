
import { IsEmail, isNotEmpty, IsNotEmpty, MinLength } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: User['email'];

  @MinLength(3)
  firstName: User['firstName'];
  
  @MinLength(3)
  lastName: User['lastName'];
  
  @IsNotEmpty()
  image: User['image'];
  
  @IsNotEmpty()
  pdf: User['pdf'];
}

export class CreateUserResponse {
  user: User;

  token: string;
}
