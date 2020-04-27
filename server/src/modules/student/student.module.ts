import { LevelModule } from './../level/level.module';
import { GuardianModule } from './../guardian/guardian.module';
import { UserModule } from './../user/user.module';
import { AuthModule } from './../../auth/auth.module';
import { ConfigModule } from './../../config/config.module';
import { Module } from '@nestjs/common';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from './student.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [StudentController],
  providers: [StudentService],

  imports: [
    TypeOrmModule.forFeature([StudentRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ConfigModule,
    AuthModule,
    UserModule,
    GuardianModule,
    LevelModule,
  ],
  exports: [StudentService],
})
export class StudentModule {}
