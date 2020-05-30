import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../../config/config.module';
import { FeesService } from './fees/fees.service';
import { FeesRepository } from './fees.repository';
import { Module } from '@nestjs/common';
import { FeesController } from './fees/fees.controller';

@Module({
  controllers: [FeesController],
  providers: [FeesService],
  imports: [
    TypeOrmModule.forFeature([FeesRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ConfigModule,
  ],
})
export class FeesModule {}
