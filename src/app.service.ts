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
    users: this.createClient(MICROSERVICE_PORTS.users),
    orders: this.createClient(MICROSERVICE_PORTS.orders),
    payments: this.createClient(MICROSERVICE_PORTS.payments),
  };

  getGatewayInfo() {
    return {
      name: 'NestJS Gateway',
      transport: 'http',
      microservices: Object.entries(MICROSERVICE_PORTS).map(([name, port]) => ({
        name,
        host: DEFAULT_MICROSERVICE_HOST,
        port,
      })),
    };
  }

  getUsers() {
    return this.requestService('users', MICROSERVICE_PATTERNS.users);
  }

  getOrders() {
    return this.requestService('orders', MICROSERVICE_PATTERNS.orders);
  }

  getPayments() {
    return this.requestService('payments', MICROSERVICE_PATTERNS.payments);
  }

  async getAllServices() {
    const [users, orders, payments] = await Promise.all([
      this.getUsers(),
      this.getOrders(),
      this.getPayments(),
    ]);

    return {
      gateway: 'NestJS Gateway',
      services: {
        users,
        orders,
        payments,
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
