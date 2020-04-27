import { RolesGuard } from './../../../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ValidatorPipe } from '../../../pipes/validator.pipe';
import { CreateUserDto } from '../dto/create-user.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../user.entity';
import { Roles } from '../../../auth/roles.decorator';
import { Response } from 'express';
@Controller('user')
@UseGuards(AuthGuard(), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @Roles('admin')
  async getUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUser();
  }

  @Get('/:id')
  @Roles('admin')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }

  @Post()
  @UsePipes(new ValidatorPipe())
  @Roles('admin')
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }

  @Put('/:id')
  @Roles('admin')
  async updateUser(@Param('id') id: string, @Body() user: CreateUserDto) {
    return await this.userService.updateUser(id, user);
  }

  @Delete('/:id')
  @Roles('admin')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Get('avatars/:fileId')
  public async serveAvatar(
    @Param('fileId') fileId: any,
    @Res() res: Response,
  ): Promise<any> {
    res.sendFile(fileId, { root: 'avatars' });
  }
}
