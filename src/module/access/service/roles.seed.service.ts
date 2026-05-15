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
    await this.seedRoles();
  }

  async seedRoles() {
    const nomes = Object.values(ROLES_NAME);
    const rolesToUpsert = nomes.map((nome) => ({
      nomeRoles: nome,
    }));

    await this.rolesRepository.upsert(rolesToUpsert, ['nomeRoles']);
  }
}
