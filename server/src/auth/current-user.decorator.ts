import { UserEntity } from './../modules/user/user.entity';
import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, req): UserEntity => {
    return req.user;
  },
);
