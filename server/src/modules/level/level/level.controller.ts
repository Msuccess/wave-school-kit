import { MessageService } from './../../../config/message/message.service';
import { CreateLevelDto } from './../dto/create-level.dto';
import {
  Controller,
  Get,
  ValidationPipe,
  Param,
  Post,
  UsePipes,
  Body,
  Put,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { LevelService } from './level.service';
import { Roles } from '../../../auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../auth/roles.guard';
import { Response } from 'express';

@Controller('level')
@UseGuards(AuthGuard(), RolesGuard)
export class LevelController {
  constructor(
    private levelService: LevelService,
    private messageService: MessageService,
  ) {}

  @Get()
  @Roles('admin')
  public async getAllLevels(@Res() res: Response) {
    const response = await this.levelService.getLevels();
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Get('/:id')
  @Roles('admin')
  public async getLevelById(@Param('id') id: string, @Res() res: Response) {
    const response = await this.levelService.getLevel(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Post()
  @Roles('admin')
  @UsePipes(ValidationPipe)
  public async createLevel(
    @Body() level: CreateLevelDto,
    @Res() res: Response,
  ) {
    const response = await this.levelService.addLevel(level);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Put('/:id')
  @Roles('admin')
  public async updateLevel(
    @Param('id') id: string,
    @Body() Level: CreateLevelDto,
    @Res() res: Response,
  ) {
    const response = await this.levelService.updateLevel(id, Level);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, data: response });
  }

  @Delete('/:id')
  @Roles('admin')
  public async delete(@Param('id') id: string, @Res() res: Response) {
    const response = await this.levelService.deleteLevel(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: this.messageService.successMessage, data: response });
  }
}
