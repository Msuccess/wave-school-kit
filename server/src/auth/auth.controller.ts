import { Response } from 'express';
import { UserDto } from './../modules/user/dto/user.dto';
import { ValidatorPipe } from './../pipes/validator.pipe';
import { CreateUserDto } from './../modules/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  UsePipes,
  Body,
  HttpStatus,
  Res,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UsePipes(new ValidatorPipe())
  async registerUser(@Body() user: CreateUserDto, @Res() res: Response) {
    const response = await this.authService.signUp(user);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Registration Successfull', data: response });
  }

  @Post('/login')
  @UsePipes(new ValidatorPipe())
  async loginUser(@Body() user: UserDto, @Res() res: Response) {
    const response = await this.authService.sigIn(user);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Login Successfull', data: response });
  }
}
