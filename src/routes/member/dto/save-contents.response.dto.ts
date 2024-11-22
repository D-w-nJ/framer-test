import { ApiProperty } from '@nestjs/swagger';
import { SaveContentsRequestDto } from './save-contents.request.dto';

export class SaveContentsResponseDto {
  @ApiProperty({
    description: '저장된 컨텐츠 정보',
    type: SaveContentsRequestDto
  })
  contents: SaveContentsRequestDto;
}