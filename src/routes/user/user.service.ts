import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateUserRequestDto } from './dto/createUser.request.dto';
import { User } from '@app/database/entities/user.entity';
import { DataSource } from '@app/database';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource
  ) {}

  async getUserList () {
    return this.dataSource.manager.find(User, {
      select: ['id', 'email', 'password', 'name']
    });
  }

  async createUser (payload: CreateUserRequestDto, queryRunnerManager: EntityManager) {
    await queryRunnerManager.insert(User, payload);

    return { user: payload };
  }
}