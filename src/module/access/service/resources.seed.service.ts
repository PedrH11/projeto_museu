import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RESOURCES_NAME } from '../../../commons/constants/resources.constants';
import { Resources } from '../entities/resources.entity';

@Injectable()
export class ResourcesSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Resources)
    private resourcesRepository: Repository<Resources>,
  ) {}
  async onModuleInit() {
    await this.seedResources();
  }

  async seedResources() {
    const nomes = Object.values(RESOURCES_NAME);
    const resourcesToUpsert = nomes.map((nome) => ({
      nomeResources: nome,
    }));
    await this.resourcesRepository.upsert(resourcesToUpsert, ['nomeResources']);
  }
}
