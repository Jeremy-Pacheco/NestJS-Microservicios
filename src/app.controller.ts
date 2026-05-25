import { Body, Controller, Delete, Get, Param, Patch, Post, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import type { StoreItemInput } from './microservices/microservice.constants';

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

  @Post('store/products')
  createUser(@Body() body: StoreItemInput) {
    return this.appService.createUser(body);
  }

  @Patch('store/products/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<StoreItemInput>) {
    return this.appService.updateUser(id, body);
  }

  @Delete('store/products/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteUser(id);
  }

  @Get('store/cart')
  getOrders() {
    return this.appService.getOrders();
  }

  @Post('store/cart')
  createOrder(@Body() body: StoreItemInput) {
    return this.appService.createOrder(body);
  }

  @Patch('store/cart/:id')
  updateOrder(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<StoreItemInput>) {
    return this.appService.updateOrder(id, body);
  }

  @Delete('store/cart/:id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteOrder(id);
  }

  @Get('store/checkout')
  getPayments() {
    return this.appService.getPayments();
  }

  @Post('store/checkout')
  createPayment(@Body() body: StoreItemInput) {
    return this.appService.createPayment(body);
  }

  @Patch('store/checkout/:id')
  updatePayment(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<StoreItemInput>) {
    return this.appService.updatePayment(id, body);
  }

  @Delete('store/checkout/:id')
  deletePayment(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deletePayment(id);
  }
}
