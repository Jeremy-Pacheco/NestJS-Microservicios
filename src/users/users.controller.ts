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
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(MICROSERVICE_PATTERNS.products.list)
  list(@Payload() payload: ServiceRequest): CrudResponse<StoreItem[]> {
    return this.usersService.list(payload);
  }

  @MessagePattern(MICROSERVICE_PATTERNS.products.create)
  create(@Payload() payload: CreateItemRequest): CrudResponse<StoreItem> {
    return this.usersService.create(payload);
  }

  @MessagePattern(MICROSERVICE_PATTERNS.products.update)
  update(@Payload() payload: UpdateItemRequest): CrudResponse<StoreItem> {
    return this.usersService.update(payload);
  }

  @MessagePattern(MICROSERVICE_PATTERNS.products.delete)
  delete(@Payload() payload: DeleteItemRequest): CrudResponse<StoreItem> {
    return this.usersService.delete(payload);
  }
}