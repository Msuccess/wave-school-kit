import { LevelModule } from './../level/level.module';
import { ConfigModule } from './../../config/config.module';
import { Module } from '@nestjs/common';
import { SubjectService } from './subject/subject.service';
import { SubjectController } from './subject/subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectRepository } from './subject.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [SubjectService],
  controllers: [SubjectController],
  imports: [
    TypeOrmModule.forFeature([SubjectRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ConfigModule,
    LevelModule,
  ],
})
export class SubjectModule {}
