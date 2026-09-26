# Despliegue estático del frontend en Hostinger

## Compilar

La URL del backend ya está en `public/runtime-config.js`. Ejecuta:

```bash
npm ci
npm run build
```

## Subir

En el Administrador de archivos de Hostinger abre `public_html` del dominio `pedidos360.alcindo.tech` y sube **todos los archivos que están dentro de**:

```text
dist/frontend-pedido360/browser/
```

El archivo `index.html`, `.htaccess`, `runtime-config.js`, los archivos JavaScript y los estilos deben quedar directamente dentro de `public_html`.

No hace falta desplegar Angular como aplicación Node.js. El frontend es un sitio estático HTML/CSS/JavaScript; solamente el backend continúa como aplicación Node.js.
