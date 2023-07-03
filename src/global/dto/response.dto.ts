import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ResponseDto<T> {
  @ApiProperty({ title: '오류 코드', description: '0일 때 정상 응답' })
  @IsNumber()
  error: number;

  @ApiProperty({ title: '오류 메시지', description: '{ error: 0 } 이 아닐 때에만 반환됨', required: false })
  @IsString()
  @IsOptional()
  message: string;

  payload: T;
}