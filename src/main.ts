import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Bật Validation toàn cục
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các trường không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu Client gửi lên trường lạ
      transform: true, // Tự động convert kiểu dữ liệu (ví dụ: string sang number)
    }),
  );

  // 2. Bật Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // 3.1. Cấu hình các thông tin cơ bản cho tài liệu
  const config = new DocumentBuilder()
    .setTitle('Hệ thống Quản lý Người dùng - NestJS')
    .setDescription('Tài liệu hướng dẫn sử dụng API chi tiết (v1.0)')
    .setVersion('1.0')
    .addTag('users') // Phân nhóm theo thẻ
    .addBearerAuth() // Cho phép nhập JWT Token trên giao diện Swagger
    .build();

  // 3.2. Khởi tạo tài liệu
  const document = SwaggerModule.createDocument(app, config);

  // 3.3. Thiết lập đường dẫn truy cập tài liệu (ví dụ: http://localhost:3000/api-docs)
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
