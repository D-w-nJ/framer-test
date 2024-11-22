import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, maxLength } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({
    description: '회원가입 ID, 1자 이상 20자 이내',
    example: 'narahan',
    maxLength: 20,
    minLength: 1,
  })
  @IsString()
  @Length(1, 20)
  id: string;

  @ApiProperty({
    description: '회원가입 비밀번호, 5자 이상 50자 이내',
    example: 'narapassword',
    maxLength: 50,
    minLength: 5,
  })
  @IsString()
  @Length(5, 50)
  password: string;
}