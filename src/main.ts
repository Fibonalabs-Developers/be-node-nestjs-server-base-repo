import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  // ENV Variables
  const NODE_ENV = configService.get('nodeEnv');
  const PORT = configService.get('port');

  // Security
  if (NODE_ENV === 'production') {
    app.use(helmet());
  }

  // Cors
  app.enableCors();

  // Validation (Class Validator)
  app.useGlobalPipes(new ValidationPipe());

  // API Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Swagger Documentation
  if (NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Fibonalabs Backend')
      .setDescription('Fibonalabs Backend')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('doc', app, document);
  }

  await app.listen(PORT, '0.0.0.0');
  console.log(`APP IS RUNNING ON ${await app.getUrl()}`);
}
bootstrap();
