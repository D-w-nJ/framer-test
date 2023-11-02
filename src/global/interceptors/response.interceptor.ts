import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { map } from 'rxjs';
import { ExceptionCode } from '../exception/exception-code';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept (context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();

    const res = ctx.getResponse();

    return next.handle().pipe(
      map(data => {
        res.status(HttpStatus.OK);

        return { error: ExceptionCode.SUCCESS, payload: data };
      })
    );
  }
}