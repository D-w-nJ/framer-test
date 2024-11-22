import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({
    description: '회원가입된 멤버 ID(회원가입 입력 ID와 동일)',
    example: 'narahan'
  })
  id: string;
}