import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Đăng ký Entity User
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export để các module khác (như AuthModule) có thể inject
})
export class UserModule {}
