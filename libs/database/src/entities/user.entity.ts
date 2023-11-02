import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum MemberLevel {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER'
}

@Entity({ name: 'USER' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true })
  email: string;

  @Column({ length: 256 })
  password: string;

  @Column({ length: 10 })
  name: string;

  @Column({ length: 20, nullable: true, default: null })
  nickname: string;

  @Column({ nullable: true, default: null })
  smsReception: Date;

  @Column({ nullable: true, default: null })
  emailReception: Date;

  @Column({ type: 'enum', enum: MemberLevel, default: MemberLevel.MEMBER })
  level: MemberLevel;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
  @DeleteDateColumn() deletedAt: Date;
}