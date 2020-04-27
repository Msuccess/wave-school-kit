import { MessageService } from './../../../config/message/message.service';
import { RolesGuard } from './../../../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { CreateResultDto } from './../dto/create-result.dto';
import { Roles } from '../../../auth/roles.decorator';
import {
  Controller,
  ValidationPipe,
  Get,
  Param,
  Post,
  UsePipes,
  Body,
  Put,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { Response } from 'express';
import { QueryModel } from './../../shared/model/query.model';

@Controller('result')
@UseGuards(AuthGuard(), RolesGuard)
export class ResultController {
  constructor(
    private resultService: ResultService,
    private messageService: MessageService,
  ) {}

  @Get()
  @Roles('admin')
  public async getAllResults(@Res() res: Response, @Query() query: QueryModel) {
    const response = await this.resultService.getResults(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Get('/:id')
  @Roles('admin', 'teacher')
  public async getResultById(@Param('id') id: string, @Res() res: Response) {
    const response = await this.resultService.getResult(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Post()
  @Roles('admin', 'teacher')
  @UsePipes(ValidationPipe)
  public async createResult(
    @Body() Result: CreateResultDto,
    @Res() res: Response,
  ) {
    const response = await this.resultService.addResult(Result);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Put('/:id')
  @Roles('admin', 'teacher')
  public async updateResult(
    @Param('id') id: string,
    @Body() Result: CreateResultDto,
    @Res() res: Response,
  ) {
    const response = await this.resultService.updateResult(id, Result);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Delete('/:id')
  @Roles('admin')
  public async delete(@Param('id') id: string, @Res() res: Response) {
    const response = await this.resultService.deleteResult(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, data: response });
  }
}
