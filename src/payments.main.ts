import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { PaymentsModule } from './payments/payments.module';
import { DEFAULT_MICROSERVICE_HOST, MICROSERVICE_PORTS } from './microservices/microservice.constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PaymentsModule, {
    transport: Transport.TCP,
    options: {
      host: DEFAULT_MICROSERVICE_HOST,
      port: MICROSERVICE_PORTS.checkout,
    },
  });

  await app.listen();
}

bootstrap();