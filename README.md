# Art Space Visualizer — Etapa 1

Sala digital de exhibición para las obras de **Buda Studio**. Esta es la
primera etapa: header, navegación, hero, obra principal y "Selected Works".
Sin 3D, sin física, sin wallet todavía.

## Nota importante sobre el origen de este código

El repositorio `budastudio/art-space-visualizer` en GitHub existe pero
está **vacío** (sin commits). Por eso esta etapa se construyó desde cero
en lugar de editar archivos existentes — no había nada que editar.

Tampoco pude leer el código fuente del Store real
(`budastudio.github.io/store.html`) porque solo tengo lectura de la
página renderizada (texto), no del HTML/CSS/JS ni de los assets del
repo que la publica. Lo que sí pude confirmar leyendo el Store:

- Categorías reales: `ALL / PAINTINGS / T-SHIRTS / PHYSICAL / OBJKT`
- Artista: **Leonardo M. Scarcia**
- Una obra real confirmada: **"WAVES — TRIPTYCH"**, presentada como
  edición triptych
- Formatos reales: Fine Art print, Hahnemühle Canvas, framed edition,
  NFT Certificate / Original
- Redes reales: X (`@budastudio_nft`), Instagram (`@budastudio_art`),
  Linktree, contacto `budastudiomkt@gmail.com`

Todo eso ya está integrado en `js/data.js` y en el footer. El resto de
las obras en "Selected Works" son **placeholders explícitamente
marcados** (`placeholder: true` en `js/data.js`) hasta que se pueda
sincronizar con los datos/imágenes reales del Store — ver sección
"Qué queda preparado para la Etapa 2".

## Estructura de archivos

```
art-space-visualizer/
├── index.html        # estructura de la página (header, hero, art space, grid, footer)
├── css/
│   └── style.css      # design tokens + todos los estilos
├── js/
│   ├── data.js         # capa de datos de las obras (ver nota arriba)
│   └── main.js          # render de la obra destacada, grid, filtros, nav mobile
└── README.md
```

Sin build step. Es HTML/CSS/JS plano, sin dependencias de npm.

## Cómo ejecutar el proyecto

1. Abrí `index.html` directamente en el navegador, o
2. Servilo con cualquier servidor estático, por ejemplo:
   ```bash
   cd art-space-visualizer
   python3 -m http.server 8000
   ```
   y visitá `http://localhost:8000`.

## Decisiones de diseño (Etapa 1)

- **Paleta**: negro cálido casi puro (`#0c0b09`), blanco cálido
  (`#f3ede1`), beige (`#cdbd9d`) y un dorado muy contenido (`#b3915a`)
  usado solo como acento — nunca como color dominante.
- **Tipografía**: `Fraunces` (serif editorial, con carácter) para
  títulos y nombres de obra; `Work Sans` para navegación, labels y
  cuerpo. Jerarquía clara entre display / small-caps label / body.
- **Composición**: mucho espacio negativo, una sola obra protagonista
  centrada en una "pared" con iluminación sutil, metadata mínima
  (Artist / Title / Year / Format) en vez de un layout tipo e-commerce.
- **Selected Works**: grid editorial de 6 piezas con hover discreto
  (leve escala + aparición de metadata), sin tarjetas tipo SaaS.
- Sin gradientes exagerados, sin glassmorphism, sin animaciones
  scroll-triggered en cada sección — un único momento de foco: la
  obra principal.

## Qué archivos se modificaron / crearon

Como el repo estaba vacío, **todo es nuevo**:

- `index.html` (nuevo)
- `css/style.css` (nuevo)
- `js/data.js` (nuevo)
- `js/main.js` (nuevo)
- `README.md` (nuevo)

## Qué datos del Store se reutilizaron

- Artista (Leonardo M. Scarcia)
- Categorías de navegación/filtro (Paintings, T-Shirts, Physical, OBJKT)
- El nombre real de una obra: "Waves — Triptych"
- Formatos de edición reales (Fine Art print, Hahnemühle Canvas, framed
  edition, NFT Certificate)
- Enlaces reales de redes y contacto
- El botón **STORE** del header apunta directo a
  `https://budastudio.github.io/store.html` (no se modificó el Store)

## Qué queda preparado para la Etapa 2

- `js/data.js` está deliberadamente aislado del resto del código: es
  el único archivo que debería cambiar cuando conectemos datos/imágenes
  reales del Store (vía fetch a un JSON, CMS, o metadata on-chain).
  `main.js` y el CSS no dependen de su forma interna, solo de los
  campos (`title`, `artist`, `year`, `format`, `category`, `palette`).
- Los "canvases" de las obras son actualmente gradientes generados por
  paleta (`paintCanvas()` en `main.js`) — pensados para ser reemplazados
  1 a 1 por `<img>` reales sin tocar el layout.
- La sección `.art-space` está separada visualmente del resto para que
  en Etapa 3 pueda convertirse en un espacio 3D/spatial sin rehacer el
  header, nav ni el grid.
- Los filtros de categoría ya están conectados a datos reales de
  categoría, listos para escalar a más obras.

**No se avanzó a la Etapa 2.** Esta entrega es solo la Etapa 1 para
revisión visual, como pediste.
