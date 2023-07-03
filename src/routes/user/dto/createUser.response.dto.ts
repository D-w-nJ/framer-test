import { Type } from 'class-transformer';
import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
  @ApiProperty({ description: '생성된 유저 정보', type: UserDto })
  @Type(() => UserDto)
  user: UserDto;
}