import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  // Giả lập một mảng dữ liệu (Sau này sẽ thay bằng Database)
  private users = [
    { id: 1, username: 'than_dev', email: 'than@example.com' },
    { id: 2, username: 'nest_pro', email: 'pro@example.com' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: { username: string; email: string }) {
    const newUser = {
      id: Date.now(), // Tạo ID ngẫu nhiên bằng timestamp
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
}
