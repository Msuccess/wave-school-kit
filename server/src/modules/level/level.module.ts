import { ConfigModule } from './../../config/config.module';
import { Module } from '@nestjs/common';
import { LevelController } from './level/level.controller';
import { LevelService } from './level/level.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelRepository } from './level.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [LevelController],
  providers: [LevelService],
  imports: [
    TypeOrmModule.forFeature([LevelRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ConfigModule,
  ],
})
export class LevelModule {}
