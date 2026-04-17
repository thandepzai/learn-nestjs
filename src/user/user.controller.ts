import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service'; // 1. Import Service

@Controller('user')
export class UserController {
  // 2. Inject Service thông qua Constructor
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    // 3. Gọi hàm từ Service thay vì trả về text "vô tri"
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body: { username: string; email: string }) {
    return this.userService.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Lưu ý: ID từ Param luôn là string, cần convert sang number
    return this.userService.findOne(Number(id));
  }
}
