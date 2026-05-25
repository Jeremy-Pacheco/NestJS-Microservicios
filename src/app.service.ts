import { Injectable, OnModuleDestroy } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  DEFAULT_MICROSERVICE_HOST,
  type CreateItemRequest,
  type CrudResponse,
  type DeleteItemRequest,
  MICROSERVICE_PATTERNS,
  MICROSERVICE_PORTS,
  type MicroserviceName,
  type ServiceRequest,
  type StoreItem,
  type StoreItemInput,
  type UpdateItemRequest,
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
    return this.requestService<CrudResponse<StoreItem[]>, ServiceRequest>(
      'products',
      MICROSERVICE_PATTERNS.products.list,
      {
        requestedBy: 'gateway',
      },
    );
  }

  getOrders() {
    return this.requestService<CrudResponse<StoreItem[]>, ServiceRequest>(
      'cart',
      MICROSERVICE_PATTERNS.cart.list,
      {
        requestedBy: 'gateway',
      },
    );
  }

  getPayments() {
    return this.requestService<CrudResponse<StoreItem[]>, ServiceRequest>(
      'checkout',
      MICROSERVICE_PATTERNS.checkout.list,
      {
        requestedBy: 'gateway',
      },
    );
  }

  createUser(item: StoreItemInput) {
    return this.requestService<CrudResponse<StoreItem>, CreateItemRequest>(
      'products',
      MICROSERVICE_PATTERNS.products.create,
      {
        requestedBy: 'gateway',
        item,
      },
    );
  }

  updateUser(id: number, item: Partial<StoreItemInput>) {
    return this.requestService<CrudResponse<StoreItem>, UpdateItemRequest>(
      'products',
      MICROSERVICE_PATTERNS.products.update,
      {
        requestedBy: 'gateway',
        id,
        item,
      },
    );
  }

  deleteUser(id: number) {
    return this.requestService<CrudResponse<StoreItem>, DeleteItemRequest>(
      'products',
      MICROSERVICE_PATTERNS.products.delete,
      {
        requestedBy: 'gateway',
        id,
      },
    );
  }

  createOrder(item: StoreItemInput) {
    return this.requestService<CrudResponse<StoreItem>, CreateItemRequest>(
      'cart',
      MICROSERVICE_PATTERNS.cart.create,
      {
        requestedBy: 'gateway',
        item,
      },
    );
  }

  updateOrder(id: number, item: Partial<StoreItemInput>) {
    return this.requestService<CrudResponse<StoreItem>, UpdateItemRequest>(
      'cart',
      MICROSERVICE_PATTERNS.cart.update,
      {
        requestedBy: 'gateway',
        id,
        item,
      },
    );
  }

  deleteOrder(id: number) {
    return this.requestService<CrudResponse<StoreItem>, DeleteItemRequest>(
      'cart',
      MICROSERVICE_PATTERNS.cart.delete,
      {
        requestedBy: 'gateway',
        id,
      },
    );
  }

  createPayment(item: StoreItemInput) {
    return this.requestService<CrudResponse<StoreItem>, CreateItemRequest>(
      'checkout',
      MICROSERVICE_PATTERNS.checkout.create,
      {
        requestedBy: 'gateway',
        item,
      },
    );
  }

  updatePayment(id: number, item: Partial<StoreItemInput>) {
    return this.requestService<CrudResponse<StoreItem>, UpdateItemRequest>(
      'checkout',
      MICROSERVICE_PATTERNS.checkout.update,
      {
        requestedBy: 'gateway',
        id,
        item,
      },
    );
  }

  deletePayment(id: number) {
    return this.requestService<CrudResponse<StoreItem>, DeleteItemRequest>(
      'checkout',
      MICROSERVICE_PATTERNS.checkout.delete,
      {
        requestedBy: 'gateway',
        id,
      },
    );
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
    for (const client of Object.values(this.clients)) {
      client.close();
    }
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

  private async requestService<TResponse, TPayload>(
    serviceName: MicroserviceName,
    pattern: string,
    payload: TPayload,
  ) {
    return firstValueFrom(
      this.clients[serviceName].send<TResponse, TPayload>(pattern, payload),
    );
  }
}
