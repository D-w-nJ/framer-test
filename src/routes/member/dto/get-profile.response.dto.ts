import { ApiProperty } from '@nestjs/swagger';

export class GetProfileImageResponseDto {
  @ApiProperty({
    description: 'file 이름',
    example: 'file-98841a4a-b393-4405-867c-7fd8c6834015.jpg',
  })
  filename: string;

  @ApiProperty({
    description: 'base64 형식 프로필 이미지',
    example: 'R0lGODdhZABkAIEAAP8AAAAAAAAAAAAAACwAAAAAZABkAEAIoQABCBxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MWHBAADs=',
  })
  data: string;

  @ApiProperty({
    description: 'MIME 타입',
    example: 'image/jpeg',
  })
  mimeType: string;
}