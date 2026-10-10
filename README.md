# Suplementos Pinzón

Sitio web oficial de **Suplementos Pinzón**, emprendimiento panameño de suplementos deportivos.

## Estructura
- `index.html`: página principal.
- `styles.css`: diseño responsive.
- `data.js`: catálogo, precios y combos. Este es el archivo principal a editar cuando cambien productos o precios.
- `app.js`: renderizado del catálogo, filtros y enlaces de WhatsApp.
- `assets/`: imágenes del sitio.

## Actualizar precios
Abre `data.js`, busca el producto y cambia el valor de `price`.

Ejemplo:
```js
price: 12.50
```

Si un producto no debe mostrar precio, usa:
```js
price: null
```

## Publicación
El sitio está preparado para GitHub Pages desde la rama `main` y la carpeta raíz `/`.
