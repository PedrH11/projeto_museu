import { Module } from '@nestjs/common';
import { ResourceController } from './controller/resource.controller';
import { ResourceService } from './service/resource.service';

@Module({
  imports: [],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
