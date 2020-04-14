import { Module } from '@nestjs/common';
import { MessageService } from './message/message.service';
import { LoggingService } from './logging/logging.service';

@Module({
  providers: [MessageService, LoggingService],
  exports: [MessageService],
})
export class ConfigModule {}
