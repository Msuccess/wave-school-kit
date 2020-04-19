import { ConfigModule } from './../../config/config.module';
import { GuardianRepository } from './guardian.repository';
import { Module } from '@nestjs/common';
import { GuardianService } from './guardian/guardian.service';
import { GuardianController } from './guardian/guardian.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [GuardianService],
  controllers: [GuardianController],
  imports: [
    TypeOrmModule.forFeature([GuardianRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    ConfigModule,
  ],
  exports: [GuardianService],
})
export class GuardianModule {}
