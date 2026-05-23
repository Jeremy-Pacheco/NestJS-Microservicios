import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getGatewayInfo() {
    return this.appService.getGatewayInfo();
  }

  @Get('microservices')
  getMicroservices() {
    return this.appService.getAllServices();
  }

  @Get('microservices/users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Get('microservices/orders')
  getOrders() {
    return this.appService.getOrders();
  }

  @Get('microservices/payments')
  getPayments() {
    return this.appService.getPayments();
  }
}
