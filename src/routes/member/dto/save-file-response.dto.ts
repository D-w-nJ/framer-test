import { ApiProperty } from '@nestjs/swagger';

export class SaveFileResponseDto {
  @ApiProperty({
    description: '생성된 사진 고유토큰',
    example: 'file-48fd4268-c4d5-47f4-85ce-ec3065b1b413.png',
  })
  file: string;
}