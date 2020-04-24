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
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../user.entity';
import { Roles } from '../../../auth/roles.decorator';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post(':userid/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './avatars',

        filename: (
          _req: any,
          file: { originalname: string },
          cb: (arg0: any, arg1: string) => any,
        ) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadAvatar(@Param('userid') userId, @UploadedFile() file) {
    this.userService.setAvatar(Number(userId), file);
  }

  @Get('avatars/:fileId')
  async serveAvatar(
    @Param('fileId') fileId: any,
    @Res() res: Response,
  ): Promise<any> {
    res.sendFile(fileId, { root: 'avatars' });
  }
}
