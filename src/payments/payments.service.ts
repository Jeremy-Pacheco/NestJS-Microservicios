import { Injectable } from '@nestjs/common';
import type { ServiceRequest, ServiceResponse } from '../microservices/microservice.constants';

@Injectable()
export class PaymentsService {
  buildResponse(payload: ServiceRequest): ServiceResponse {
    return {
      service: 'payments',
      status: 'ok',
      message: 'Payments microservice is running',
      requestedBy: payload.requestedBy,
      receivedAt: new Date().toISOString(),
    };
  }
}