import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  log(message: any, context?: string) {
    console.log(message, context);
  }
  error(message: any, trace?: string, context?: string) {
    console.log(message, context, trace);
  }
  warn(message: any, context?: string) {
    console.log(message, context);
  }
  debug?(message: any, context?: string) {
    console.log(message, context);
  }
  verbose?(message: any, context?: string) {
    console.log(message, context);
  }
}
