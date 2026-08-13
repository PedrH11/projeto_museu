import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ColaboratorsService } from '../service/colaborators.service';
import {
  CreateColaboratorDto,
  UpdateColaboratorDto,
} from '../dto/colaborators/request/colaborators.request';

@Controller('colaborators')
export class ColaboratorsController {
  constructor(private readonly colaboratorsService: ColaboratorsService) {}

  @Post()
  create(@Body() createColaboratorDto: CreateColaboratorDto) {
    return this.colaboratorsService.create(createColaboratorDto);
  }

  @Get()
  findAll() {
    return this.colaboratorsService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColaboratorDto: UpdateColaboratorDto,
  ) {
    return this.colaboratorsService.update(id, updateColaboratorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.colaboratorsService.remove(id);
  }
}
