import { Injectable } from '@nestjs/common';
import type { ServiceRequest, ServiceResponse } from '../microservices/microservice.constants';

@Injectable()
export class UsersService {
  buildResponse(payload: ServiceRequest): ServiceResponse {
    return {
      service: 'products',
      status: 'ok',
      message: 'Products microservice is running',
      requestedBy: payload.requestedBy,
      receivedAt: new Date().toISOString(),
    };
  }
}