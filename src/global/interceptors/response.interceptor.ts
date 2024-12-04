import { CallHandler, ExecutionContext, HttpStatus, Logger, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { map } from 'rxjs';
import { ExceptionCode } from '../exception/exception-code';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ResponseInterceptor.name); // Logger 인스턴스 생성

  intercept (context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    const res = ctx.getResponse();
    this.logRequest(req);

    return next.handle().pipe(
      map(data => {
        res.status(HttpStatus.OK);
        this.logResponse(req, res, data);

        return { error: ExceptionCode.SUCCESS, payload: data };
      })
    );
  }

  private logRequest(req: any) {
    const { method, url, headers, body, query } = req;
    this.logger.log(`Request: ${method} ${url}`);
    this.logger.debug(`Headers: ${JSON.stringify(headers)}`);
    this.logger.debug(`Query: ${JSON.stringify(query)}`);
    this.logger.debug(`Body: ${JSON.stringify(body)}`);
  }

  private logResponse(req: any, res: any, data: any) {
    const { method, url } = req;
    const statusCode = res.statusCode;
    this.logger.log(`Response: ${method} ${url} -> ${statusCode}`);
    this.logger.debug(`Response Data: ${JSON.stringify(data)}`);
  }
}