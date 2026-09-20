# Frontend Pedidos360

![Angular](https://img.shields.io/badge/Angular_21-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?logo=reactivex&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![npm](https://img.shields.io/badge/npm_11-CB3837?logo=npm&logoColor=white)

Tienda responsive de videojuegos conectada al backend Node.js de Pedidos360. Incluye catálogo, buscador, detalle, carrito, checkout, historial de pedidos y autenticación local o social.

## Mejoras incluidas

- Interfaz bilingüe español/inglés; inicia en español y conserva la preferencia elegida.
- Formularios profesionales de acceso y registro con logos reales de cada proveedor.
- Acceso social preparado para Google, Apple, Facebook, GitHub y Microsoft.
- Navbar fijo de escritorio y menú móvil con **Iniciar sesión**, **Crear cuenta** y selector de idioma.
- Cards con bordes suaves, elevación y zoom al pasar el mouse o tocar.
- Imágenes dimensionadas para escritorio, tablet y móvil sin recortes.
- Catálogo de 16 videojuegos y encabezado compacto con inspiración visual de los años 90.
- JWT agregado automáticamente a las solicitudes protegidas.
- Configuración de API modificable sin recompilar el proyecto.

## Ejecutar

Con Node.js 24 y npm 11:

```bash
npm install
npm run dev
```

También puedes usar:

```bash
npm start
```

Ambos comandos levantan Angular en `http://localhost:4200`. Ya no necesitas escribir manualmente `ng serve --host 0.0.0.0 --port 4200`.

## Conexión con el backend

En desarrollo, `public/runtime-config.js` ya apunta a:

```js
window.__PEDIDOS360_CONFIG__ = {
  apiUrl: 'http://localhost:3000/api/v1'
};
```

Para producción cambia esa URL por la dirección pública de tu API antes de compilar o directamente en el archivo generado `dist/frontend-pedido360/browser/runtime-config.js`.

## Compilar para Hostinger

```bash
npm ci
npm run build
```

Sube el contenido de `dist/frontend-pedido360/browser/` al directorio público del dominio. El `.htaccess` incluido permite abrir rutas como `/auth/login` o `/orders` sin errores 404.

## Estructura

```text
src/app/
├── core/             # autenticación, interceptor, modelos y servicios API
├── features/         # tienda, acceso, carrito, checkout y pedidos
├── shared/           # header y footer reutilizables
├── app.config.ts
└── app.routes.ts
```

> La tarjeta `4242 4242 4242 4242` pertenece al flujo demostrativo. No se procesa ni almacena una tarjeta real.
