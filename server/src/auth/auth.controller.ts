import { UserDto } from './../modules/user/dto/user.dto';
import { ValidatorPipe } from './../pipes/validator.pipe';
import { CreateUserDto } from './../modules/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Controller, Post, UsePipes, Body, Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UsePipes(new ValidatorPipe())
  async registerUser(@Body() user: CreateUserDto, @Req() req: any) {
    console.log(req);
    return await this.authService.signUp(user);
  }

  @Post('/login')
  @UsePipes(new ValidatorPipe())
  async loginUser(@Body() user: UserDto) {
    return await this.authService.sigIn(user);
  }
}
