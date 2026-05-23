<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Gateway + 3 Microservices

Este repositorio contiene un gateway HTTP de NestJS y tres microservicios TCP:

- `users` en el puerto `4001`
- `orders` en el puerto `4002`
- `payments` en el puerto `4003`

El gateway expone rutas HTTP para consultar cada servicio de forma individual o agregada.

## Requisitos

1. Tener Node.js y `pnpm` instalados.
2. Ejecutar la instalación de dependencias.

```bash
pnpm install
```

## Levantar el proyecto

Abre cuatro terminales y ejecuta un proceso en cada una:

```bash
pnpm run start:users
pnpm run start:orders
pnpm run start:payments
pnpm run start:gateway
```

Por defecto, el gateway queda en `http://localhost:3000`.

## Rutas del gateway

1. `GET /` devuelve información general del gateway.
2. `GET /microservices` devuelve la respuesta combinada de los 3 microservicios.
3. `GET /microservices/users` consulta el microservicio de usuarios.
4. `GET /microservices/orders` consulta el microservicio de órdenes.
5. `GET /microservices/payments` consulta el microservicio de pagos.

## Probar el proyecto

```bash
pnpm run test
pnpm run test:e2e
pnpm run build
```

## Estructura

- `src/main.ts` arranca el gateway HTTP.
- `src/users.main.ts` arranca el microservicio de usuarios.
- `src/orders.main.ts` arranca el microservicio de órdenes.
- `src/payments.main.ts` arranca el microservicio de pagos.

## Notas

Si quieres, puedes cambiar los puertos desde `src/microservices/microservice.constants.ts`.
