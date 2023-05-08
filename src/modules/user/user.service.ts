import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { type FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto.ts';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async getOne(
    options: FindOptionsWhere<User> | FindOptionsWhere<User>[] = {}
  ) {
    const user = await this.userRepository.findOneBy(options);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async createUser(user: CreateUserDto) {
    const userToCreate = this.userRepository.create(user);

    return this.userRepository.save(userToCreate);
  }

  async updateUser(id: string, user: UpdateUserDto) {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser) {
      throw new NotFoundException();
    }

    return  await this.userRepository.update({id}, {...user});
  }

  async findOrCreate(options: CreateUserDto) {
    const user = await this.userRepository.findOneBy(options);

    if (!user) {
      return this.createUser(options);
    }

    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({id});

    if (!user) {
      return new NotFoundException();
    }

    return await this.userRepository.delete(user);
  }
}
