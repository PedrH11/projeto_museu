import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../../auth/config/guards/jwt-authentication.guard';
import { EmailScheduleResponse } from '../dto/emailSchedule.dto';
import EmailSchedulingService from '../service/emailScheduling.service';

@Controller('email-scheduling')
export default class EmailSchedulingController {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingService,
  ) {}

  @Post('schedule')
  @UseGuards(JwtAuthenticationGuard)
  async scheduleEmail(@Body() emailSchedule: EmailScheduleResponse) {
    this.emailSchedulingService.scheduleEmail(emailSchedule);
  }
}
