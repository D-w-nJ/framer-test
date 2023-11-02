import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { EntityManager } from 'typeorm';
import { CreateUserRequestDto } from './dto/createUser.request.dto';
import { CreateUserResponseDto } from './dto/createUser.response.dto';
import { ApiResponseData } from 'src/global/decorators/apiResponseData.decorator';
import { TransactionManager } from 'src/global/decorators/transaction.decorator';
import { TransactionInterceptor } from 'src/global/interceptors/transaction.interceptor';
import { MemberLevel } from '@app/database/entities/user.entity';
import { HasRoles, JwtAuthGuard, RolesGuard } from '@app/jwt';

@ApiTags('User')
// @ApiBearerAuth('accessToken')
// @HasRoles(MemberLevel.ADMIN)
// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ version: '1' })
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiOperation({ summary: '유저 목록' })
  @Get('list')
  getUserList () {
    return this.service.getUserList();
  }

  @ApiOperation({ summary: '유저 생성' })
  @ApiResponseData(CreateUserResponseDto)
  @UseInterceptors(TransactionInterceptor)
  @Post('create')
  createUser (@Body() body: CreateUserRequestDto, @TransactionManager() queryRunnerManager: EntityManager) {
    return this.service.createUser(body, queryRunnerManager);
  }
}