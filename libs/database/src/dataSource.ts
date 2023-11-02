import { Logger } from '@nestjs/common';
import { ExceptionCode } from 'src/global/exception/exception-code';
import { ServiceException } from 'src/global/exception/service.exception';
import { QueryFailedError, QueryRunner, DataSource as _DataSource } from 'typeorm';

class TransactionBuilder {
  private callback: (queryRunner: QueryRunner) => Promise<unknown>;
  private errorFn: any;
  private finallyFn: () => void;

  constructor(private readonly dataSource: DataSource) {}

  try(callback: (queryRunner: QueryRunner) => Promise<unknown>) {
    this.callback = callback;

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  catch(errorFn: Function) {
    this.errorFn = errorFn;

    return this;
  }

  finally(finallyFn: () => void) {
    this.finallyFn = finallyFn;

    return this;
  }

  async execute() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let result: any = false;

    try {
      result = await this.callback(queryRunner);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      Logger.error('TRANSACTION ERROR::', e);

      if (this.errorFn) result = await this.errorFn(e);

      if (e instanceof QueryFailedError) {
        if ((e as any).code === 'ER_DUP_ENTRY') throw new ServiceException(ExceptionCode.DATABASE_ERROR, 'DB 키 중복 오류');
      }
      if (e instanceof ServiceException) throw e;

      throw new ServiceException(ExceptionCode.DATABASE_ERROR);
    } finally {
      await queryRunner.release();

      if (this.finallyFn) {
        await this.finallyFn();
      }
    }

    this.callback = undefined;
    this.errorFn = undefined;
    this.finallyFn = undefined;

    return result;
  }
}

export class DataSource extends _DataSource {
  transactionBuilder() {
    return new TransactionBuilder(this);
  }
}