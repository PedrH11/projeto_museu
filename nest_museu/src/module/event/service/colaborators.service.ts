import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colaborator } from '../entities/colaborators.entity';
import {
  CreateColaboratorDto,
  UpdateColaboratorDto,
} from '../dto/colaborators/request/colaborators.request';
import { ColaboratorsConverter } from '../dto/colaborators/converter/colaborators.converter';
import { COLABORATORS_CONSTANTS } from '../constants/colaborators.constants';

@Injectable()
export class ColaboratorsService {
  constructor(
    @InjectRepository(Colaborator)
    private readonly colaboratorRepository: Repository<Colaborator>,
  ) {}

  async create(createColaboratorDto: CreateColaboratorDto) {
    const entity = ColaboratorsConverter.toEntity(createColaboratorDto);
    const savedEntity = await this.colaboratorRepository.save(entity);
    return ColaboratorsConverter.toResponse(savedEntity);
  }

  async findAll() {
    const entities = await this.colaboratorRepository.find();
    return entities.map((entity) => ColaboratorsConverter.toResponse(entity));
  }

  async update(id: number, updateColaboratorDto: UpdateColaboratorDto) {
    const entity = await this.colaboratorRepository.findOne({
      where: { idColaborator: id },
    });

    if (!entity) {
      throw new NotFoundException(COLABORATORS_CONSTANTS.NOT_FOUND);
    }

    if (updateColaboratorDto.name) {
      entity.name = updateColaboratorDto.name;
    }

    if (updateColaboratorDto.logo_url !== undefined) {
      entity.logoUrl = updateColaboratorDto.logo_url;
    }

    const updatedEntity = await this.colaboratorRepository.save(entity);
    return ColaboratorsConverter.toResponse(updatedEntity);
  }

  async remove(id: number) {
    const entity = await this.colaboratorRepository.findOne({
      where: { idColaborator: id },
    });

    if (!entity) {
      throw new NotFoundException(COLABORATORS_CONSTANTS.NOT_FOUND);
    }

    await this.colaboratorRepository.remove(entity);
    return { message: COLABORATORS_CONSTANTS.DELETED_SUCCESS };
  }
}
