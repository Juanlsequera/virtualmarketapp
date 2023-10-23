import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { UserModule } from './modules/user/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Store API')
    .setDescription('API PRODUCTS')
    .setVersion('1.0')
    .addTag('user')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [ProductsModule, UserModule],
  });
  SwaggerModule.setup('api', app, document);
  const port = process.env.PORT || 4000;

  app.enableCors({
    origin: ['http://localhost:3000'],
  });

  await app.listen(port);
  console.log(`PORT LISTEN: ${port}`);
}
bootstrap();
