import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('GET route');
    return this.appService.getHello();
  }

  @Post()
  postHello(): string {
    console.log('POST route');
    return this.appService.postHello();
  }
}
