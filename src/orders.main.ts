import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { OrdersModule } from './orders/orders.module';
import { DEFAULT_MICROSERVICE_HOST, MICROSERVICE_PORTS } from './microservices/microservice.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(OrdersModule, {
    transport: Transport.TCP,
    options: {
      host: DEFAULT_MICROSERVICE_HOST,
      port: MICROSERVICE_PORTS.cart,
    },
  });

  await app.listen();
}

bootstrap();