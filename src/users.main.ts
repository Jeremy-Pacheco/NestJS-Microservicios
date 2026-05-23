import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { UsersModule } from './users/users.module';
import { DEFAULT_MICROSERVICE_HOST, MICROSERVICE_PORTS } from './microservices/microservice.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UsersModule, {
    transport: Transport.TCP,
    options: {
      host: DEFAULT_MICROSERVICE_HOST,
      port: MICROSERVICE_PORTS.products,
    },
  });

  await app.listen();
}

bootstrap();