import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
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
    for (const nome of nomes) {
      const existe = await this.resourcesRepository.findOne({
        where: { nomeResources: nome } as FindOptionsWhere<Resources>,
      });
      if (!existe) {
        const novoRecurso = this.resourcesRepository.create({
          nomeResources: nome,
        });
        await this.resourcesRepository.save(novoRecurso);
      }
    }
  }
}
