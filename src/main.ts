import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.enableVersioning({
    type: VersioningType.URI
  });
  app.setGlobalPrefix('api', { exclude: ['health'] });
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  );

  await app.listen(process.env.PORT || 3000, () => {
    console.debug(`Server is up on PORT ${process.env.PORT || 3000}`);
  });
}

bootstrap().catch((error) => {
  console.error(error);
});