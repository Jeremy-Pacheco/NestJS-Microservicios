export const DEFAULT_MICROSERVICE_HOST = '127.0.0.1';

export const MICROSERVICE_PORTS = {
  users: 4001,
  orders: 4002,
  payments: 4003,
} as const;

export const MICROSERVICE_PATTERNS = {
  users: 'users.health',
  orders: 'orders.health',
  payments: 'payments.health',
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