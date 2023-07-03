import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ title: 'ID' })
  @IsNumber()
  id: number;

  @ApiProperty({ title: '이메일' })
  @IsString()
  email: string;

  @ApiProperty({ title: '비밀번호' })
  @IsString()
  password: string;

  @ApiProperty({ title: '이름' })
  @IsString()
  name: string;

  @ApiProperty({ title: '전화번호' })
  @IsString()
  phone: string;
}