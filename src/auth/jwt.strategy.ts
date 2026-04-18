import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/* 
PassportModule.register({
  defaultStrategy: 'jwt',  // <--- 'jwt' được đăng ký mặc định ở đây
});

AuthModule được import vào AppModule.
UserModule cũng được import vào AppModule.

Vì cả hai đều nằm trong "bào thai" chung là AppModule, 
nên khi ứng dụng khởi động, 
NestJS đã tạo ra instance của JwtStrategy rồi.

=> vì vậy ở JwtAuthGuard không cần phải import lại JwtStrategy, 
mà chỉ cần import PassportModule là được.
*/

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy Token từ Header (Bearer)
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || '',
    });
  }

  validate(payload: any) {
    // Sau khi giải mã Token thành công, dữ liệu Payload sẽ được gán vào req.user
    return { userId: payload.sub, username: payload.username };
  }
}
