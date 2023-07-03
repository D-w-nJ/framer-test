import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept (context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();

    const res = ctx.getResponse();

    return next.handle().pipe(
      map(data => {
        res.status(HttpStatus.OK);

        if (!data) return { error: ErrorCode.NO_RESPONSE, message: '응답 데이터 없음' };
        else if (data.error) return data;
        else return { error: ErrorCode.SUCCESS, payload: data };
      })
    );
  }
}