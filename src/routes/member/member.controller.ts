import { Body, Controller, Get, Headers, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '../../global/decorators/apiResponseData.decorator';
import { SignUpResponseDto } from './dto/sign-up.response.dto';
import { SignUpRequestDto } from './dto/sign-up.request.dto';
import { SaveFileResponseDto } from './dto/save-file-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, join } from 'path';
import { homedir } from 'os';
import { v4 as uuid } from 'uuid';
import { SaveContentsResponseDto } from './dto/save-contents.response.dto';
import { SaveContentsRequestDto } from './dto/save-contents.request.dto';
import { GetContentResponseDto } from './dto/get-contents.response.dto';

const uploadPath = join(homedir(), 'framer');

export const multerOption = {
  storage: diskStorage({
    destination: (req, file, callback) => {
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true }); // 디렉토리가 없으면 생성
      }
      callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
      const filename = `file-${uuid()}${extname(file.originalname)}`;
      callback(null, filename);
    }
  })
};

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponseData(SignUpResponseDto)
  @Post('sign-up')
  signUp(@Body() body: SignUpRequestDto) {
    return this.memberService.signUp(body.id, body.password);
  }

  @ApiOperation({ summary: '사진/동영상 저장' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '사진 파일'
        }
      }
    }
  })
  @ApiResponseData(SaveFileResponseDto)
  @UseInterceptors(FileInterceptor('file', multerOption))
  @Post('file')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    return {
      file: file.filename
    };
  }

  @ApiOperation({ summary: '컨텐츠 저장' })
  @ApiResponseData(SaveContentsResponseDto)
  @Post('contents')
  saveContents(@Headers('id') id: string, @Body() body: SaveContentsRequestDto) {
    return this.memberService.saveContents(id, body);
  }

  @ApiOperation({ summary: '컨텐츠 불러오기' })
  @ApiResponseData(GetContentResponseDto)
  @Get('contents')
  getContents(@Headers('id') id: string) {
    return this.memberService.getContents(id);
  }

  @ApiOperation({ summary: '모든 멤버 조회' })
  @Get('members')
  getAllMembers() {
    return this.memberService.getAllMembers();
  }

  @ApiOperation({ summary: '모든 컨텐츠 조회' })
  @Get('contents-all')
  getAllContents() {
    return this.memberService.getAllContents();
  }
}
