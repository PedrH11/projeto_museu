import { Controller, Get } from '@nestjs/common';
import { ResourceService } from '../service/resource.service';
import { Resource } from '../service/resources';

@Controller('resources-server')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get()
  getAllResources(): Resource[] {
    return this.resourceService.findAll();
  }
}
