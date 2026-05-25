<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Tienda con Gateway + 3 Microservices

Este repositorio contiene un gateway HTTP de NestJS para una tienda y tres microservicios TCP:

- `products` en el puerto `4001`
- `cart` en el puerto `4002`
- `checkout` en el puerto `4003`

El gateway expone rutas HTTP para consultar productos, carrito y checkout de forma individual o agregada.

## Requisitos

1. Tener Node.js y `pnpm` instalados.
2. Ejecutar la instalación de dependencias.

```bash
pnpm install
```

## Levantar el proyecto

Puedes arrancar todo con un solo comando:

```bash
pnpm run start:all
```

Si prefieres hacerlo manualmente, abre cuatro terminales y ejecuta un proceso en cada una:

```bash
pnpm run start:products
pnpm run start:cart
pnpm run start:checkout
pnpm run start:gateway
```

Por defecto, el gateway queda en `http://localhost:3000`.

## Rutas del gateway

Estas son las rutas que puedes probar en el gateway:

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `http://localhost:3000/` | Devuelve información general del gateway. |
| `GET` | `http://localhost:3000/store` | Devuelve la respuesta combinada de los 3 microservicios. |
| `GET` | `http://localhost:3000/store/products` | Lista los productos. |
| `POST` | `http://localhost:3000/store/products` | Crea un producto. |
| `PATCH` | `http://localhost:3000/store/products/1` | Actualiza un producto por id. |
| `DELETE` | `http://localhost:3000/store/products/1` | Elimina un producto por id. |
| `GET` | `http://localhost:3000/store/cart` | Lista los items del carrito. |
| `POST` | `http://localhost:3000/store/cart` | Crea un item del carrito. |
| `PATCH` | `http://localhost:3000/store/cart/1` | Actualiza un item del carrito por id. |
| `DELETE` | `http://localhost:3000/store/cart/1` | Elimina un item del carrito por id. |
| `GET` | `http://localhost:3000/store/checkout` | Lista los items de checkout. |
| `POST` | `http://localhost:3000/store/checkout` | Crea un item de checkout. |
| `PATCH` | `http://localhost:3000/store/checkout/1` | Actualiza un item de checkout por id. |
| `DELETE` | `http://localhost:3000/store/checkout/1` | Elimina un item de checkout por id. |

Ejemplo rápido:

```bash
curl http://localhost:3000/store
```

Ejemplo de body para `POST` o `PATCH`:

```json
{
  "name": "Teclado mecánico",
  "description": "Teclado RGB en español",
  "price": 75,
  "quantity": 3
}
```

Los datos quedan en memoria, así que se reinician al detener el proceso.

## Probar el proyecto

```bash
pnpm run test
pnpm run test:e2e
pnpm run build
```

## Estructura

- `src/main.ts` arranca el gateway HTTP.
- `src/users.main.ts` arranca el microservicio de productos.
- `src/orders.main.ts` arranca el microservicio de carrito.
- `src/payments.main.ts` arranca el microservicio de checkout.

## Notas

Si quieres, puedes cambiar los puertos desde `src/microservices/microservice.constants.ts`.
