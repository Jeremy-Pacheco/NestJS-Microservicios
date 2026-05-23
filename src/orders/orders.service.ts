import { Injectable } from '@nestjs/common';
import type { ServiceRequest, ServiceResponse } from '../microservices/microservice.constants';

@Injectable()
export class OrdersService {
  buildResponse(payload: ServiceRequest): ServiceResponse {
    return {
      service: 'orders',
      status: 'ok',
      message: 'Orders microservice is running',
      requestedBy: payload.requestedBy,
      receivedAt: new Date().toISOString(),
    };
  }
}