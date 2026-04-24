import { Controller, Get } from '@nestjs/common';
import { Resource } from '../resources';
import { ResourceService } from '../service/resource.service';

@Controller('resources-server')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get()
  getAllResources(): Resource[] {
    return this.resourceService.findAll();
  }
}
