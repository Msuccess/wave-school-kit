import { SECRET } from './../config/config';
import { ResultException } from '../config/result';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET,
    });
  }

  public async validate(req: any, _payload: any) {
    const isValid = await this.authService.validateUser(req);

    if (!isValid) {
      return new ResultException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return isValid;
  }
}
