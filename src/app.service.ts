import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  DEFAULT_MICROSERVICE_HOST,
  MICROSERVICE_PATTERNS,
  MICROSERVICE_PORTS,
  type MicroserviceName,
  type ServiceResponse,
} from './microservices/microservice.constants';

@Injectable()
export class AppService implements OnModuleDestroy {
  private readonly clients: Record<MicroserviceName, ClientProxy> = {
    products: this.createClient(MICROSERVICE_PORTS.products),
    cart: this.createClient(MICROSERVICE_PORTS.cart),
    checkout: this.createClient(MICROSERVICE_PORTS.checkout),
  };

  getGatewayInfo() {
    return {
      name: 'NestJS Store Gateway',
      transport: 'http',
      microservices: Object.entries(MICROSERVICE_PORTS).map(([name, port]) => ({
        name,
        host: DEFAULT_MICROSERVICE_HOST,
        port,
      })),
    };
  }

  getUsers() {
    return this.requestService('products', MICROSERVICE_PATTERNS.products);
  }

  getOrders() {
    return this.requestService('cart', MICROSERVICE_PATTERNS.cart);
  }

  getPayments() {
    return this.requestService('checkout', MICROSERVICE_PATTERNS.checkout);
  }

  async getAllServices() {
    const [users, orders, payments] = await Promise.all([
      this.getUsers(),
      this.getOrders(),
      this.getPayments(),
    ]);

    return {
      gateway: 'NestJS Store Gateway',
      services: {
        products: users,
        cart: orders,
        checkout: payments,
      },
    };
  }

  onModuleDestroy() {
    Object.values(this.clients).forEach((client) => client.close());
  }

  private createClient(port: number) {
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: DEFAULT_MICROSERVICE_HOST,
        port,
      },
    });
  }

  private async requestService(serviceName: MicroserviceName, pattern: string) {
    return firstValueFrom(
      this.clients[serviceName].send<ServiceResponse, { requestedBy: string }>(pattern, {
        requestedBy: 'gateway',
      }),
    );
  }
}
