import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder().setTitle('basic Nest API')
  .setDescription('Basic NestJS API')
  .addBearerAuth({
    type:'http', scheme:'bearer', bearerFormat:'Token'
  },'access-Token')
  .setVersion('1.0.0')
  .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/', app , document)
  await app.listen(3000);
}
bootstrap();
