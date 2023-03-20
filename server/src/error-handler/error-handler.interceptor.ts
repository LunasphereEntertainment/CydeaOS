import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface ErrorResponse<T> {
    statusCode: number;
    message: string;
}

@Injectable()
export class ErrorHandlerInterceptor<T> implements NestInterceptor<T, ErrorResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(data => {
      if (data instanceof NotFoundException) {
        return {
            statusCode: 404,
            message: data.message
        }
      } else if (data instanceof BadRequestException) {
        return {
            statusCode: 400,
            message: data.message
        }
      } else {
        return {
            statusCode: 500,
            message: 'Internal Server Error'
        }
      }
    }));
  }
}
