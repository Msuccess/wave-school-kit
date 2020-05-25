import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Get,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter, editFileName } from './file-upload.utils';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../auth/roles.decorator';

@Controller('fileupload')
@UseGuards(AuthGuard(), RolesGuard)
export class FileuploadController {
  @Post()
  @Roles('admin', 'teacher', 'student')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 1024 },
    }),
  )
  public async uploadedFile(@UploadedFile() file, @Res() res: Response) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    console.log(response);
    return res.sendFile(response.filename, { root: './files' });
  }

  @Post('multiple')
  @Roles('admin', 'teacher', 'student')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach((file: { originalname: any; filename: any }) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    console.log(response);
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
}
