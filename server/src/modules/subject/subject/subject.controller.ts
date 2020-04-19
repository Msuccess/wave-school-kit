import { RolesGuard } from './../../../auth/roles.guard';
import { MessageService } from './../../../config/message/message.service';
import { SubjectService } from './subject.service';
import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../../auth/roles.decorator';
import { CreateSubjectDto } from '../dto/create-subject.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('subject')
@UseGuards(AuthGuard(), RolesGuard)
export class SubjectController {
  constructor(
    private subjectService: SubjectService,
    private messageService: MessageService,
  ) {}

  @Get()
  @Roles('admin')
  public async getAllSubjects(@Res() res: Response) {
    const response = await this.subjectService.getSubjects();
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Get('/:id')
  @Roles('admin', 'teacher')
  public async getSubjectById(@Param('id') id: string, @Res() res: Response) {
    const response = await this.subjectService.getSubject(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Post()
  @Roles('admin', 'teacher')
  @UsePipes(ValidationPipe)
  public async createSubject(
    @Body() subject: CreateSubjectDto,
    @Res() res: Response,
  ) {
    const response = await this.subjectService.addSubject(subject);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Put('/:id')
  @Roles('admin', 'teacher')
  public async updateSubject(
    @Param('id') id: string,
    @Body() subject: CreateSubjectDto,
    @Res() res: Response,
  ) {
    const response = await this.subjectService.updateSubject(id, subject);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Delete('/:id')
  @Roles('admin')
  public async delete(@Param('id') id: string, @Res() res: Response) {
    const response = await this.subjectService.deleteSubject(id);

    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }
}
