import { Module } from '@nestjs/common';
import { FotoSingleFileController } from './controller/foto.controller';
import { FotoService } from './service/foto.service';

@Module({
  controllers: [FotoSingleFileController],
  providers: [FotoService],
})
export class FotoModule {}
