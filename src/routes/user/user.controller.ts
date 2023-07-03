import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { TransactionInterceptor } from 'global/interceptors/transaction.interceptor';
import { TransactionManager } from 'global/decorators/transaction.decorator';
import { EntityManager } from 'typeorm';
import { CreateUserRequestDto } from './dto/createUser.request.dto';
import { ApiResponseData } from 'global/decorators/apiResponseData.decorator';
import { CreateUserResponseDto } from './dto/createUser.response.dto';

@ApiTags('User')
/* @ApiBearerAuth('accessToken')
@HasRoles(EMemberLevel.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard) */
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