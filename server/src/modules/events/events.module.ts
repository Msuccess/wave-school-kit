import { ConfigModule } from '../../config/config.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { Module } from '@nestjs/common';
import { EventsRepository } from './events.repository';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [
    TypeOrmModule.forFeature([EventsRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ConfigModule,
  ],
})
export class EventsModule {}
