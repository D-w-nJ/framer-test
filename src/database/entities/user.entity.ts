import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum MemberLevel {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER'
}

export enum LoginType {
  CHAEDITOR = 'CHAEDITOR',
  GOOGLE = 'GOOGLE',
  NAVER = 'NAVER',
  KAKAO = 'KAKAO'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NONE = 'NONE'
}

@Entity({ name: 'USER' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, unique: true }) // 아이디 (이메일)
  email: string;

  // @Column({ type: 'enum', enum: LoginType, default: LoginType.CHAEDITOR }) // 로그인 타입
  // loginType: LoginType;

  @Column({ unique: true, nullable: true, default: null }) // 소셜로그인 고유 ID
  snsId: string;

  @Column({ length: 256, nullable: true, default: null }) // 비밀번호
  password: string;

  @Column({ nullable: true, default: null }) // 썸네일 이미지 url
  thumbnail: string;

  @Column({ length: 10 }) // 이름
  name: string;

  @Column({ length: 20, unique: true, nullable: true, default: null }) // 닉네임
  nickname: string;

  @Column({ length: 11, unique: true }) // 전화번호
  phone: string;

  @Column({ type: 'date', nullable: true }) // 생년월일
  birthDate: Date;

  // @Column({ type: 'enum', enum: Gender, default: Gender.NONE }) // 성별
  // gender: Gender;

  // @Column({ type: 'enum', enum: MemberLevel, default: MemberLevel.MEMBER }) // 유저 권한 (관리자, 일반멤버)
  // level: MemberLevel;

  @Column({ type: 'datetime', nullable: true, default: null }) // sms 수신여부
  smsReception: Date;

  @Column({ type: 'datetime', nullable: true, default: null }) // 이메일 수신여부
  emailReception: Date;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
  @DeleteDateColumn() deletedAt: Date;
}