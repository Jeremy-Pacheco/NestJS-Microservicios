export const DEFAULT_MICROSERVICE_HOST = '127.0.0.1';

export const MICROSERVICE_PORTS = {
  products: 4001,
  cart: 4002,
  checkout: 4003,
} as const;

export const MICROSERVICE_PATTERNS = {
  products: 'products.health',
  cart: 'cart.health',
  checkout: 'checkout.health',
} as const;

export type MicroserviceName = keyof typeof MICROSERVICE_PORTS;

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