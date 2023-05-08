import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';


export type JwtPayload = { sub: string; username: string };

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: JwtPayload) {
    const verifiedUser = await this.userRepository.findOne({
      where: {
        id: payload.sub
      }
    });

    if (!verifiedUser) {
      throw new UnauthorizedException();
    }

    return { id: payload.sub, username: payload.username };
  }
}
