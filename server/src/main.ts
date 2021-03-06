import { GlobalExceptionFilter } from './config/global-exception-filter';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const appOptions = { cors: true };

  const app = await NestFactory.create(AppModule, appOptions);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalFilters(new GlobalExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Wave School Kit')
    .setDescription('The Wave School Kit API description')
    .setVersion('1.0')
    .addTag('School')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Connect at port 3000');
}
bootstrap();
