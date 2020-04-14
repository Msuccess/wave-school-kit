import { StudentModule } from './modules/student/student.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { UserModule } from './modules/user/user.module';
import { ResultModule } from './modules/result/result.module';
import { LevelModule } from './modules/level/level.module';
import { GuardianModule } from './modules/guardian/guardian.module';
import { SubjectModule } from './modules/subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true }),
    ConfigModule,
    UserModule,
    AuthModule,
    StudentModule,
    ResultModule,
    LevelModule,
    GuardianModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
