import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PARAMS } from '../../../commons/constants/param.constants';
import { ApiPaginatedResponse } from '../../../commons/decorators/swagger/api-paginated-response.decorator';
import { ApiPaginationQuery } from '../../../commons/decorators/swagger/api-pagination-query.decorator';
import { ApiGetDoc } from '../../../commons/decorators/swagger/swagger.decorator';
import { SIS_MUSEU } from '../../../commons/enum/sis-museu.enum';
import { HateoasHelper } from '../../../commons/helpers/hateoas.helpers';
import { Page } from '../../../commons/pagination/pagination.sistema';
import { ApiResponse, Link } from '../../../commons/response/api.response';
import { ResponseBuilder } from '../../../commons/response/builder.response';
import { EVENT_BOOKING } from '../constants/eventbooking.constants';
import { EventBookingRequest } from '../dto/request/eventbooking.request';
import { EventBookingResponse } from '../dto/response/eventbooking.response';
import { EventBookingService } from '../service/eventbooking.service';

@ApiTags(EVENT_BOOKING.ALIAS)
@Controller(EVENT_BOOKING.ROTAS.BASE)
export class EventBookingController {
  private readonly path = `${SIS_MUSEU.ROTA_VERSIONAMENTO}/${EVENT_BOOKING.ROTAS.BASE}`;

  constructor(private readonly eventBookingService: EventBookingService) {}

  @Get()
  @ApiGetDoc(EVENT_BOOKING.OPERACAO.LISTAR, EventBookingResponse)
  @ApiPaginationQuery()
  @ApiPaginatedResponse(EventBookingResponse)
  async listar(
    @Req() req: Request,
    @Query('id_event') id_event?: number,
  ): Promise<ApiResponse<EventBookingResponse[]>> {
    const eventId = id_event ? Number(id_event) : undefined;
    const response = await this.eventBookingService.listar(eventId);

    return ResponseBuilder.status<EventBookingResponse[]>(HttpStatus.OK)
      .path(req.path)
      .message(EVENT_BOOKING.MENSAGEM.ENITDADE_LISTADA)
      .data(response)
      .metodo(req.method)
      .links(this.eventBookingLinks())
      .build();
  }

  @Post()
  async salvar(@Body() request: EventBookingRequest, @Req() req: Request) {
    const response = await this.eventBookingService.salvar(request);

    return ResponseBuilder.status<EventBookingResponse>(HttpStatus.OK)
      .message(EVENT_BOOKING.MENSAGEM.ENTIDADE_CADASTRADA)
      .path(req.path)
      .data(response)
      .metodo(req.method)
      .links(this.eventBookingLinks())
      .build();
  }

  @Patch(EVENT_BOOKING.ROTAS.ID)
  async atualizar(
    @Param(PARAMS.ID, ParseIntPipe) id: number,
    @Body() request: Partial<EventBookingRequest>,
    @Req() req: Request,
  ) {
    const response = await this.eventBookingService.atualizar(id, request);

    return ResponseBuilder.status<EventBookingResponse>(HttpStatus.OK)
      .message(EVENT_BOOKING.MENSAGEM.ENTIDADE_ALTERADA)
      .path(req.path)
      .data(response)
      .metodo(req.method)
      .links(this.eventBookingLinks(response?.id_booking))
      .build();
  }

  private eventBookingLinks(id?: number): Record<string, Link> {
    return HateoasHelper.generateResourceLinks(this.path);
  }

  private eventBookingPageLinks(
    req: Request,
    page: Page<any>,
  ): Record<string, Link> {
    return HateoasHelper.generatePaginationLinks(req, page, this.path);
  }
}
