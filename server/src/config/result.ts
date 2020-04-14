import { HttpException } from '@nestjs/common';
export class Result {
  constructor(httpStatus: any, message: string, data?: any) {
    if (data) {
      return {
        status: httpStatus,
        message: message,
        Data: data,
      };
    } else {
      return {
        status: httpStatus,
        message: message,
      };
    }
  }
}

export class ResultException {
  constructor(error: string, statusCode: number) {
    throw new HttpException({ message: error }, statusCode);
  }
}
