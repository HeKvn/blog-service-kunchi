import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { uploadStaticSrc } from './config/upload.config';
import { HttpExecptionFilter } from './filters/http-execption.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExecptionFilter())

  app.useStaticAssets(join(__dirname, '..', 'upload'), { prefix: uploadStaticSrc })

  const options = new DocumentBuilder()
    .setTitle('鲲池博客')
    .setDescription('鲲池博客接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger-doc', app, document)
  
  await app.listen(3000);
}
bootstrap();
