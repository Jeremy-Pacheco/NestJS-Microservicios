import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  MICROSERVICE_PATTERNS,
  type ServiceRequest,
  type ServiceResponse,
} from '../microservices/microservice.constants';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern(MICROSERVICE_PATTERNS.checkout)
  health(@Payload() payload: ServiceRequest): ServiceResponse {
    return this.paymentsService.buildResponse(payload);
  }
}