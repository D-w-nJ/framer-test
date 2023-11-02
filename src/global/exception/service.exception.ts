import { HttpException } from '@nestjs/common';
import { ExceptionCode, ExceptionMessage } from './exception-code';

export class ServiceException extends HttpException {
  constructor(code: ExceptionCode, msg?: string) {
    super(msg || ExceptionMessage[code], code as number);
  }
}
