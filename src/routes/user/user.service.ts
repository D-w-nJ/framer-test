import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'database/entities/user.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateUserRequestDto } from './dto/createUser.request.dto';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getUserList () {
    return this.userRepo.find({
      select: ['id', 'email', 'password', 'name', 'phone']
    });
  }

  async createUser (payload: CreateUserRequestDto, queryRunnerManager: EntityManager) {
    await queryRunnerManager.insert(User, payload);

    return { user: payload };
  }
}