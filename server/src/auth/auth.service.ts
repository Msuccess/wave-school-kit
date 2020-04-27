import { EXPIRESIN } from './../config/config';
import { UserRole } from './../modules/user/user.entity';
import { ResultException } from '../config/result';
import { PasswordEncrypterService } from './password-encrypter/password-encrypter.service';
import { UserDto } from './../modules/user/dto/user.dto';
import { MessageService } from './../config/message/message.service';
import { CreateUserDto } from './../modules/user/dto/create-user.dto';
import { UserService } from './../modules/user/user/user.service';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private message: MessageService,
    private passwordEncrypterService: PasswordEncrypterService,
    private jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto) {
    if (this.validateUser(user.username)) {
      const password = (
        await this.passwordEncrypterService.hash(user.password)
      ).toString();

      const newUser = new CreateUserDto();
      newUser.password = password;
      newUser.email = user.email;
      newUser.phoneNumber = user.phoneNumber;
      newUser.username = user.username;
      newUser.role = user.role;

      return await this.userService.createUser(newUser);
    } else {
      throw new HttpException(
        { message: this.message.userAlreadyExist },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sigIn(user: UserDto) {
    try {
      const dbUser = await this.userService.getUserByUserName(user.username);

      if (dbUser) {
        const verifyPassword = await this.passwordEncrypterService.verify(
          user.password,
          dbUser.password,
        );

        if (verifyPassword) {
          const token = await this.createToken(
            dbUser.id,
            dbUser.username,
            dbUser.role,
          );

          return { token, dbUser };
        }
      }
      return new ResultException(
        this.message.logInFail,
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async validateUser(userDto: any) {
    return this.userService.getUserByUserName(userDto.username);
  }

  async createToken(id: string, username: string, role: UserRole) {
    const expiresIn = EXPIRESIN;
    const user = { id: id, username: username, role: role };
    const token = this.jwtService.sign(user);

    return { expiresIn: expiresIn, token };
  }

  verifyToken(token: string) {
    this.jwtService.verify(token);
  }
}
