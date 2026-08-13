import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { VisitorsConverter } from '../dto/visitors/converter/visitors.converter';
import {
  CreateVisitorRequest,
  UpdateVisitorRequest,
} from '../dto/visitors/request/visitors.request';
import { VisitorResponse } from '../dto/visitors/response/visitors.response';
import { VisitorsService } from '../service/visitors.service';

@Controller('visitors')
export class VisitorsController {
  constructor(private readonly visitorsService: VisitorsService) {}

  @Post()
  async create(
    @Body() request: CreateVisitorRequest,
  ): Promise<VisitorResponse> {
    const visitor = await this.visitorsService.create(request);
    return VisitorsConverter.toResponse(visitor);
  }

  @Get()
  async findAll(): Promise<VisitorResponse[]> {
    const visitors = await this.visitorsService.findAll();
    return VisitorsConverter.toResponseList(visitors);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<VisitorResponse> {
    const visitor = await this.visitorsService.findOne(id);
    return VisitorsConverter.toResponse(visitor);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateVisitorRequest,
  ): Promise<VisitorResponse> {
    const visitor = await this.visitorsService.update(id, request);
    return VisitorsConverter.toResponse(visitor);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.visitorsService.remove(id);
  }
}
