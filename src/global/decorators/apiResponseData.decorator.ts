import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from '../dto/response.dto';

export const ApiResponseData = <DataDto extends Type<unknown>>(dataDto: DataDto) => {
  return applyDecorators(
    ApiExtraModels(ResponseDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              payload: { $ref: getSchemaPath(dataDto) }
            }
          }
        ]
      }
    })
  );
};