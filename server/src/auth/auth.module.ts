import { ConfigModule } from './../config/config.module';
import { SECRET, EXPIRESIN } from './../config/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './../modules/user/user.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { PasswordEncrypterService } from './password-encrypter/password-encrypter.service';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET || SECRET,
      signOptions: { expiresIn: EXPIRESIN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PasswordEncrypterService],
  exports: [PassportModule, JwtStrategy, AuthService],
})
export class AuthModule {}
