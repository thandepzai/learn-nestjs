import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  // 1. Xác thực người dùng (Kiểm tra username & password)
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user) {
      const { password, ...result } = user;
      const passwordMatches = await bcrypt.compare(pass, password);
      if (passwordMatches) return result;
    }
    return null;
  }

  // 2. Tạo Token sau khi đăng nhập thành công
  login(user: any) {
    const payload = { username: user.username, sub: user.id };

    try {
      const token = this.jwtService.sign(payload);
      this.logger.log('Tạo token thành công:', token);
      return {
        access_token: token,
      };
    } catch (error) {
      this.logger.error('Lỗi trong quá trình đăng nhập', error.stack);
      throw error;
    }
  }
}
