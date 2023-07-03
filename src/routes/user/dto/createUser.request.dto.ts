import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  password: string;

  @ApiProperty({ description: '이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '휴대폰 번호' })
  @IsString()
  phone: string;
}