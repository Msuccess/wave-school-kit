import { ConfigModule } from './../../config/config.module';
import { Module } from '@nestjs/common';
import { ResultController } from './result/result.controller';
import { ResultService } from './result/result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultRepository } from './result.repository';
import { PassportModule } from '@nestjs/passport';
import { SubjectModule } from './../subject/subject.module';
import { StudentModule } from './../student/student.module';
@Module({
  controllers: [ResultController],
  providers: [ResultService],
  imports: [
    TypeOrmModule.forFeature([ResultRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ConfigModule,
    SubjectModule,
    StudentModule,
  ],
})
export class ResultModule {}
