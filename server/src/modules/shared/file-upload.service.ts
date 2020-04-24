import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export class FileUploadService implements MulterOptionsFactory {
  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    throw new Error('Method not implemented.');
  }
}
