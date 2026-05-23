import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  MICROSERVICE_PATTERNS,
  type ServiceRequest,
  type ServiceResponse,
} from '../microservices/microservice.constants';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(MICROSERVICE_PATTERNS.users)
  health(@Payload() payload: ServiceRequest): ServiceResponse {
    return this.usersService.buildResponse(payload);
  }
}