import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MessageService } from '../../../config/message/message.service';
import { TeacherService } from './teacher.service';
import { Roles } from '../../../auth/roles.decorator';
import { Response } from 'express';
import { CreateTeacherDto } from '../dto/create-teacher.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { QueryModel } from './../../shared/model/query.model';

@Controller('teacher')
@UseGuards(AuthGuard(), RolesGuard)
export class TeacherController {
  constructor(
    private teacherService: TeacherService,
    private messageService: MessageService,
  ) {}

  @Get()
  @Roles('admin')
  public async getAllTeachers(
    @Res() res: Response,
    @Query() query: QueryModel,
  ) {
    const response = await this.teacherService.getTeachers(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Get('/:id')
  @Roles('admin', 'teacher')
  public async getTeacherById(@Param('id') id: string, @Res() res: Response) {
    const response = await this.teacherService.getTeacher(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Post()
  @Roles('admin', 'teacher')
  @UsePipes(ValidationPipe)
  public async createTeacher(
    @Body() Teacher: CreateTeacherDto,
    @Res() res: Response,
  ) {
    const response = await this.teacherService.addTeacher(Teacher);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Put('/:id')
  @Roles('admin', 'teacher')
  public async updateTeacher(
    @Param('id') id: string,
    @Body() Teacher: CreateTeacherDto,
    @Res() res: Response,
  ) {
    const response = await this.teacherService.updateTeacher(id, Teacher);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Delete('/:id')
  @Roles('admin')
  public async delete(@Param('id') id: string, @Res() res: Response) {
    const response = await this.teacherService.deleteTeacher(id);

    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }
}
