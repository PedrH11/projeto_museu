import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VISITOR_ERRORS } from '../constants/visitors.constants';
import {
  CreateVisitorRequest,
  UpdateVisitorRequest,
} from '../dto/visitors/request/visitors.request';
import { Visitor } from '../entities/visitors.entity';

@Injectable()
export class VisitorsService {
  constructor(
    @InjectRepository(Visitor)
    private readonly visitorRepository: Repository<Visitor>,
  ) {}

  async create(request: CreateVisitorRequest): Promise<Visitor> {
    const visitor = this.visitorRepository.create(request);
    try {
      return await this.visitorRepository.save(visitor);
    } catch (error: any) {
      // 23505 = Postgres Unique Violation
      if (error.code === '23505') {
        throw new ConflictException(VISITOR_ERRORS.ALREADY_EXISTS);
      }
      throw error;
    }
  }

  async findAll(): Promise<Visitor[]> {
    return this.visitorRepository.find();
  }

  async findOne(id: number): Promise<Visitor> {
    const visitor = await this.visitorRepository.findOne({
      where: { idVisitor: id },
    });
    if (!visitor) {
      throw new NotFoundException(VISITOR_ERRORS.NOT_FOUND);
    }
    return visitor;
  }

  async update(id: number, request: UpdateVisitorRequest): Promise<Visitor> {
    const visitor = await this.findOne(id);
    Object.assign(visitor, request);

    try {
      return await this.visitorRepository.save(visitor);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException(VISITOR_ERRORS.ALREADY_EXISTS);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const visitor = await this.findOne(id);
    await this.visitorRepository.remove(visitor);
  }
}
