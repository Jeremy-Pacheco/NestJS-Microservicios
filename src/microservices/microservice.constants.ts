export const DEFAULT_MICROSERVICE_HOST = '127.0.0.1';

export const MICROSERVICE_PORTS = {
  products: 4001,
  cart: 4002,
  checkout: 4003,
} as const;

export const MICROSERVICE_PATTERNS = {
  products: {
    list: 'products.list',
    create: 'products.create',
    update: 'products.update',
    delete: 'products.delete',
  },
  cart: {
    list: 'cart.list',
    create: 'cart.create',
    update: 'cart.update',
    delete: 'cart.delete',
  },
  checkout: {
    list: 'checkout.list',
    create: 'checkout.create',
    update: 'checkout.update',
    delete: 'checkout.delete',
  },
} as const;

export type MicroserviceName = keyof typeof MICROSERVICE_PORTS;

export interface StoreItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export type StoreItemInput = Omit<StoreItem, 'id'>;

export interface ServiceResponse {
  service: MicroserviceName;
  status: 'ok';
  message: string;
  requestedBy: string;
  receivedAt: string;
}

export interface ServiceRequest {
  requestedBy: string;
}

export interface CreateItemRequest extends ServiceRequest {
  item: StoreItemInput;
}

export interface UpdateItemRequest extends ServiceRequest {
  id: number;
  item: Partial<StoreItemInput>;
}

export interface DeleteItemRequest extends ServiceRequest {
  id: number;
}

export interface CrudResponse<T> extends ServiceResponse {
  data?: T;
  items?: StoreItem[];
}