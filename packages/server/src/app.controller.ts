import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ClassDemo } from '@leafpixi/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const demo: ClassDemo = new ClassDemo();
    return JSON.stringify(demo);
  }
}
