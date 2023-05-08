import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-auth.strategy';


@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async login(user: User) {
    const verifiedUser = await this.userRepository.findOne({
      where: {
        id: user.id
      }
    });

    if (!verifiedUser) {
      throw new ForbiddenException(
        'You are not allowed to access the data. Please, contact you admin'
      );
    }

    const payload: JwtPayload = {
      username: user.email,
      sub: verifiedUser.id
    };

    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
