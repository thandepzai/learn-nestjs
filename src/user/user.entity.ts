import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // Tên bảng trong Database
export class User {
  @PrimaryGeneratedColumn() // Tự động tăng ID
  id: number;

  @Column()
  username: string;

  @Column({ unique: true }) // Email không được trùng
  email: string;

  @Column({ select: false }) // select: false để khi GET user không bị lòi mật khẩu ra ngoài
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
