import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) // Lệnh bài: "Này NestJS, lấy Repository của bảng User ra đây"
    private userRepository: Repository<User>, // Biến này giờ là "siêu công cụ" chứa các hàm: .find(), .save(), .update()...
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10); // Tạo muối (salt) để tăng độ khó
    return await bcrypt.hash(password, salt);
  }

  // 1. Create: Tạo mới user
  async create(userData: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(userData.password);

    const newUser = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  // 2. Read (All): Lấy danh sách tất cả user
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // 3. Read (One): Lấy chi tiết 1 user theo ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Không tìm thấy User với ID là ${id}`);
    }
    return user;
  }

  // 4. Update: Cập nhật thông tin user
  async update(id: number, updateData: Partial<User>): Promise<User> {
    await this.findOne(id); // Kiểm tra xem user có tồn tại không trước khi update
    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  }

  // 5. Delete: Xóa user
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  // Thêm hàm này vào class UserService
  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password'],
    });
  }
}
