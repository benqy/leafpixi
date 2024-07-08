import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ClassDemo } from '@leafpixi/common'
import { utilFn } from '@leafpixi/common/utils'
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const demo: ClassDemo = new ClassDemo()
    const utilR = utilFn('wgwgw')
    return JSON.stringify(demo) + utilR
  }
}
