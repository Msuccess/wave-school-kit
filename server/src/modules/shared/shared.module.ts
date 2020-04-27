import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { FileuploadController } from './fileupload/fileupload.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    AuthModule,
  ],
  controllers: [FileuploadController],
})
export class SharedModule {}
