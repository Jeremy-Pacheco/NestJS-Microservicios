import { Injectable } from '@nestjs/common';
import type { ServiceRequest, ServiceResponse } from '../microservices/microservice.constants';

@Injectable()
export class UsersService {
  buildResponse(payload: ServiceRequest): ServiceResponse {
    return {
      service: 'users',
      status: 'ok',
      message: 'Users microservice is running',
      requestedBy: payload.requestedBy,
      receivedAt: new Date().toISOString(),
    };
  }
}