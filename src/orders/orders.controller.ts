import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  MICROSERVICE_PATTERNS,
  type ServiceRequest,
  type ServiceResponse,
} from '../microservices/microservice.constants';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(MICROSERVICE_PATTERNS.orders)
  health(@Payload() payload: ServiceRequest): ServiceResponse {
    return this.ordersService.buildResponse(payload);
  }
}