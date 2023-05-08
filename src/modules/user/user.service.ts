import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { type FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto.ts';
import * as PdfPrinter from 'pdfmake';
import * as fs from 'fs';


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

  async generatePdfForUser(id: string) {
    const user = await this.userRepository.findOneBy({id});

    if(!user) throw new NotFoundException();

    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    };
    const printer = new PdfPrinter(fonts);

    const docDefinition = {
      content: [
        { text: `${user.firstName} ${user.lastName}`, fontSize: 25 },
        {image: user.image, fit: [100, 100]}
      ],
      defaultStyle: {
        font: 'Helvetica'
      }
    };

    let file_name = 'PDF_' + user.id + '.pdf';
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream( file_name, { }));
    pdfDoc.end();
    
    return { 'file_name': file_name };
  }

  async createUser(user: CreateUserDto) {

    const userToCreate =await this.userRepository.create(user);

    return await this.userRepository.save(userToCreate);
  }

  async updateUser(id: string, user: UpdateUserDto) {
    const foundUser = await this.userRepository.findOneBy({ id });

    if (!foundUser) {
      throw new NotFoundException();
    }

    return await this.userRepository.update({ id }, { ...user });
  }

  async findOrCreate(options: CreateUserDto) {
    const user = await this.userRepository.findOneBy(options);

    if (!user) {
      return this.createUser(options);
    }

    return user;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return new NotFoundException();
    }

    return await this.userRepository.delete(user);
  }
}
