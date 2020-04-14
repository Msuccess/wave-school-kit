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
  ],
})
export class StudentModule {}
