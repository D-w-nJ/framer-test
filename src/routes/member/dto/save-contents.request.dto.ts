import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SaveContentsRequestDto {
  @ApiProperty({
    description: '텍스트',
    example: 'text'
  })
  @IsString()
  text: string;

  @ApiPropertyOptional({
    description: '서브텍스트',
    example: 'subtext'
  })
  @IsOptional()
  @IsString()
  subtext?: string;

  @ApiPropertyOptional({
    description: '사진 filename',
    example: 'file-98841a4a-b393-4405-867c-7fd8c6834015.png'
  })
  @IsOptional()
  @IsString()
  picture: string;

  @ApiPropertyOptional({
    description: '영상 filename',
    example: 'file-qx841a4a-1d93-5d05-q17c-1cd8c683401d.mp4'
  })
  @IsOptional()
  @IsString()
  video: string;
}