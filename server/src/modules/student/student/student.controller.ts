import { MessageService } from './../../../config/message/message.service';
import { Response } from 'express';
import { CreateStudentDto } from './../dto/create-student.dto';
import { RolesGuard } from './../../../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { StudentService } from './student.service';
import {
  Controller,
  UseGuards,
  Get,
  Param,
  Query,
  Body,
  UsePipes,
  ValidationPipe,
  Put,
  Post,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Roles } from '../../../auth/roles.decorator';

@Controller('student')
@UseGuards(AuthGuard(), RolesGuard)
export class StudentController {
  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
  ) {}

  @Get()
  @Roles('admin')
  public async getAllStudents(@Res() res: Response) {
    const response = await this.studentService.getStudents();
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Get('/:id')
  @Roles('admin', 'teacher', 'student')
  public async getStudentById(@Param('id') id: string, @Res() res: Response) {
    const response = await this.studentService.getStudent(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Get('level')
  @Roles('admin', 'teacher')
  public async getStudentByLevel(
    @Query('query') query: string,
    @Res() res: Response,
  ) {
    const response = await this.studentService.getStudentsWithLevel(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Post()
  @Roles('admin', 'teacher')
  @UsePipes(ValidationPipe)
  public async createStudent(
    @Body() student: CreateStudentDto,
    @Res() res: Response,
  ) {
    const response = await this.studentService.addStudent(student);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Put()
  @Roles('admin', 'teacher')
  public async updateStudent(
    @Param('id') id: string,
    @Body() student: CreateStudentDto,
    @Res() res: Response,
  ) {
    const response = await this.studentService.updateStudent(id, student);

    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Delete('/:id')
  @Roles('admin')
  public async delete(@Param('id') id: string, @Res() res: Response) {
    const response = await this.studentService.deleteStudent(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }
}
