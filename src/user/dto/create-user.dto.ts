import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'than_dev', description: 'Tên tài khoản người dùng' })
  @IsString({ message: 'Tên người dùng phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Tên người dùng không được để trống' })
  @MinLength(3, { message: 'Tên phải có ít nhất 3 ký tự' })
  username: string;

  @ApiProperty({ example: 'cuthan@gmail.com', description: 'Email người dùng' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Mật khẩu' })
  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @ApiProperty({ example: 25, description: 'Tuổi của người dùng' })
  @IsInt({ message: 'Tuổi phải là số nguyên' })
  @Min(18, { message: 'Bạn phải trên 18 tuổi' })
  @IsOptional() // Trường này không bắt buộc
  age?: number;
}
