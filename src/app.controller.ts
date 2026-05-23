import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getGatewayInfo() {
    return this.appService.getGatewayInfo();
  }

  @Get('store')
  getMicroservices() {
    return this.appService.getAllServices();
  }

  @Get('store/products')
  getUsers() {
    return this.appService.getUsers();
  }

  @Get('store/cart')
  getOrders() {
    return this.appService.getOrders();
  }

  @Get('store/checkout')
  getPayments() {
    return this.appService.getPayments();
  }
}
