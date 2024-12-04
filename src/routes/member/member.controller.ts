import {
  Body,
  Controller,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '../../global/decorators/apiResponseData.decorator';
import { SignUpResponseDto } from './dto/sign-up.response.dto';
import { SignUpRequestDto } from './dto/sign-up.request.dto';
import { SaveFileResponseDto } from './dto/save-file-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { extname, join } from 'path';
import { homedir } from 'os';
import { v4 as uuid } from 'uuid';
import { SaveContentsResponseDto } from './dto/save-contents.response.dto';
import { SaveContentsRequestDto } from './dto/save-contents.request.dto';
import { GetContentResponseDto } from './dto/get-contents.response.dto';
import { GetProfileImageResponseDto } from './dto/get-profile.response.dto';

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
  }),
  limits: {
    fileSize: 100 * 1024 * 1024 // 최대 100MB (영상 지원을 위해 증가)
  },
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'video/mp4',
      'video/x-matroska', // MKV 지원
      'video/x-msvideo' // AVI 지원
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Unsupported file type'), false);
    }
  },
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

  @ApiOperation({ summary: '멤버 프로필 이미지(Base64) 조회' })
  @ApiResponseData(GetProfileImageResponseDto)
  @Get('member/profile/:filename')
  getProfileImage(@Param('filename') filename: string) {
    const filePath = join(homedir(), 'framer', filename);

    if (!existsSync(filePath)) {
      throw new NotFoundException(`File with name ${filename} not found`);
    }

    const fileBuffer = readFileSync(filePath);
    const base64Image = fileBuffer.toString('base64');

    const fileExtension = extname(filename).toLowerCase();
    const mimeType = this.getMimeType(fileExtension);

    if (!mimeType) {
      throw new NotFoundException(`Unsupported file type: ${fileExtension}`);
    }

    return {
      filename,
      mimeType,
      data: base64Image
    };
  }

  private getMimeType(extension: string): string | null {
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',

      '.mp4': 'video/mp4',
      '.mkv': 'video/x-matroska',
      '.avi': 'video/x-msvideo'
    };

    return mimeTypes[extension] || null;
  }
}
