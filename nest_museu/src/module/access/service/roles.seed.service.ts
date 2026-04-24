import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ROLES_NAME } from '../../../commons/constants/roles.constants';
import { Roles } from '../entities/role.entity';

@Injectable()
export class RolesSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}
  async onModuleInit() {
    await this.seedResources();
  }

  async seedResources() {
    const nomes = Object.values(ROLES_NAME);
    for (const nome of nomes) {
      const existe = await this.rolesRepository.findOne({
        where: { nomeRoles: nome },
      });
      if (!existe) {
        const novaRole = this.rolesRepository.create({
          nomeRoles: nome,
        });
        await this.rolesRepository.save(novaRole);
      }
    }
  }
}
