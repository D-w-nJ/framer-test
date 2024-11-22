import { ApiProperty } from '@nestjs/swagger';
import { SaveContentsRequestDto } from './save-contents.request.dto';
import { SaveContentsResponseDto } from './save-contents.response.dto';

export class GetContentResponseDto {
  @ApiProperty({
    description: '컨텐츠 정보',
    type: SaveContentsRequestDto
  })
  contents: SaveContentsResponseDto;
}