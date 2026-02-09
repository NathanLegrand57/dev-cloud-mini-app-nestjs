import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getError(): string {
    return this.appService.getError();
  }

  @Get('health')
  getHealth(): object {
    return { status: 'ok' };
  }
}
