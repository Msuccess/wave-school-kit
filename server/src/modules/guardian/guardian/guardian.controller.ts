import { MessageService } from './../../../config/message/message.service';
import { RolesGuard } from './../../../auth/roles.guard';
import { Roles } from '../../../auth/roles.decorator';
import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { GuardianService } from './guardian.service';
import { CreateGuardianDto } from '../dto/create-guardian.dto';
import { AuthGuard } from '@nestjs/passport';
import { Response, response } from 'express';

@Controller('guardian')
@UseGuards(AuthGuard(), RolesGuard)
export class GuardianController {
  constructor(
    private guardianService: GuardianService,
    private messageService: MessageService,
  ) {}

  @Get()
  @Roles('admin', 'student')
  public async getAllGuardians(@Res() res: Response) {
    const response = await this.guardianService.getGuardians();
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, date: response });
  }

  @Get('/:id')
  @Roles('admin', 'teacher', 'student')
  public async getGuardianById(@Param('id') id: string, @Res() res: Response) {
    const response = await this.guardianService.getGuardian(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, date: response });
  }

  @Post()
  @Roles('admin', 'teacher', 'student')
  @UsePipes(ValidationPipe)
  public async createGuardian(
    @Body() Guardian: CreateGuardianDto,
    @Res() res: Response,
  ) {
    const response = await this.guardianService.addGuardian(Guardian);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, date: response });
  }

  @Put('/:id')
  @Roles('admin', 'teacher')
  public async updateGuardian(
    @Param('id') id: string,
    @Body() guardian: CreateGuardianDto,
    @Res() res: Response,
  ) {
    const response = await this.guardianService.updateGuardian(id, guardian);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, date: response });
  }

  @Delete('/:id')
  @Roles('admin')
  public async delete(@Param('id') id: string, @Res() res: Response) {
    const response = await this.guardianService.deleteGuardian(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, date: response });
  }
}
