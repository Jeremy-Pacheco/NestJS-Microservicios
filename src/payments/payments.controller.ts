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
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern(MICROSERVICE_PATTERNS.checkout.list)
  list(@Payload() payload: ServiceRequest): CrudResponse<StoreItem[]> {
    return this.paymentsService.list(payload);
  }

  @MessagePattern(MICROSERVICE_PATTERNS.checkout.create)
  create(@Payload() payload: CreateItemRequest): CrudResponse<StoreItem> {
    return this.paymentsService.create(payload);
  }

  @MessagePattern(MICROSERVICE_PATTERNS.checkout.update)
  update(@Payload() payload: UpdateItemRequest): CrudResponse<StoreItem> {
    return this.paymentsService.update(payload);
  }

  @MessagePattern(MICROSERVICE_PATTERNS.checkout.delete)
  delete(@Payload() payload: DeleteItemRequest): CrudResponse<StoreItem> {
    return this.paymentsService.delete(payload);
  }
}