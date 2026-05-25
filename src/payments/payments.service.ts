import { Injectable, NotFoundException } from '@nestjs/common';
import {
  type CreateItemRequest,
  type CrudResponse,
  type DeleteItemRequest,
  type ServiceRequest,
  type StoreItem,
  type StoreItemInput,
  type UpdateItemRequest,
} from '../microservices/microservice.constants';

@Injectable()
export class PaymentsService {
  private items: StoreItem[] = [
    {
      id: 1,
      name: 'Payment method',
      description: 'Pago inicial de ejemplo',
      price: 200,
      quantity: 1,
    },
  ];

  private nextId = 2;

  list(payload: ServiceRequest): CrudResponse<StoreItem[]> {
    return {
      service: 'checkout',
      status: 'ok',
      message: 'Checkout list retrieved',
      requestedBy: payload.requestedBy,
      receivedAt: new Date().toISOString(),
      items: [...this.items],
    };
  }

  create(payload: CreateItemRequest): CrudResponse<StoreItem> {
    const createdItem = this.buildItem(payload.item);
    this.items.push(createdItem);

    return this.buildItemResponse(payload.requestedBy, 'Checkout item created', createdItem);
  }

  update(payload: UpdateItemRequest): CrudResponse<StoreItem> {
    const item = this.findItem(payload.id);
    const updatedItem = { ...item, ...payload.item };
    this.items = this.items.map((current) => (current.id === payload.id ? updatedItem : current));

    return this.buildItemResponse(payload.requestedBy, 'Checkout item updated', updatedItem);
  }

  delete(payload: DeleteItemRequest): CrudResponse<StoreItem> {
    const item = this.findItem(payload.id);
    this.items = this.items.filter((current) => current.id !== payload.id);

    return this.buildItemResponse(payload.requestedBy, 'Checkout item deleted', item);
  }

  private buildItem(item: StoreItemInput): StoreItem {
    return {
      id: this.nextId++,
      ...item,
    };
  }

  private findItem(id: number) {
    const item = this.items.find((current) => current.id === id);

    if (!item) {
      throw new NotFoundException(`Checkout item with id ${id} not found`);
    }

    return item;
  }

  private buildItemResponse(
    requestedBy: string,
    message: string,
    data: StoreItem,
  ): CrudResponse<StoreItem> {
    return {
      service: 'checkout',
      status: 'ok',
      message,
      requestedBy,
      receivedAt: new Date().toISOString(),
      data,
    };
  }
}