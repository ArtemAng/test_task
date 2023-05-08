import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from './configs/orm.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [

    MulterModule.register({
      dest: './uploads',
    }),
    TypeOrmModule.forRoot({
      ...ormConfig,
      logging: ['warn', 'error', 'migration'],
      logger: 'simple-console',
      autoLoadEntities: true,
      synchronize: false
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
