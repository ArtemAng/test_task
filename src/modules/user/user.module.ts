import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: 'jwts',
      passReqToCallback: true
    }),
    JwtAuthModule
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
