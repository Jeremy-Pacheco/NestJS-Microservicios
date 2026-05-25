import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  MICROSERVICE_PATTERNS,
  type CreateItemRequest,
  type CrudResponse,
  type DeleteItemRequest,
  type ServiceRequest,
  type StoreItem,
  type UpdateItemRequest,
} from '../microservices/microservice.constants';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(MICROSERVICE_PATTERNS.cart.list)
  list(@Payload() payload: ServiceRequest): CrudResponse<StoreItem[]> {
    return this.ordersService.list(payload);
  }

  @MessagePattern(MICROSERVICE_PATTERNS.cart.create)
  create(@Payload() payload: CreateItemRequest): CrudResponse<StoreItem> {
    return this.ordersService.create(payload);
  }

  @MessagePattern(MICROSERVICE_PATTERNS.cart.update)
  update(@Payload() payload: UpdateItemRequest): CrudResponse<StoreItem> {
    return this.ordersService.update(payload);
  }

  @MessagePattern(MICROSERVICE_PATTERNS.cart.delete)
  delete(@Payload() payload: DeleteItemRequest): CrudResponse<StoreItem> {
    return this.ordersService.delete(payload);
  }
}