import { Module } from '@nestjs/common';
import { TeacherController } from './teacher/teacher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '../../config/config.module';
import { TeacherService } from './teacher/teacher.service';
import { TeacherRepository } from './teacher.repository';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../user/user.module';
import { LevelModule } from '../level/level.module';

@Module({
  providers: [TeacherService],
  controllers: [TeacherController],
  imports: [
    TypeOrmModule.forFeature([TeacherRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ConfigModule,
    AuthModule,
    UserModule,
    LevelModule,
  ],
})
export class TeacherModule {}
