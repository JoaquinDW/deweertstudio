# Deweert Studio

Web institucional en español de Argentina. HTML, CSS y JavaScript sin dependencias de ejecución.

## Vista local

Desde esta carpeta, ejecutar:

```sh
npm run dev
```

Abrir http://localhost:4321. También se puede abrir `dist/index.html` directamente.

## Archivos

- `dist/index.html`: contenido, metadatos, enlaces y estructura.
- `dist/styles.css`: diseño y adaptación a celulares.
- `dist/app.js`: menú de la web institucional.
- `dist/sorteos-demo/`: miniweb embebida con packs de chances, simulación de confirmación, consulta de números y ganadores ficticios.
- `dist/assets/moto-demo.jpg`: fotografía generada para el premio ficticio.
- `context/marketing.md`: decisiones de contenido y límites de las afirmaciones.
- `.openai/hosting.json`: configuración de la versión alojada en Sites.

El contenido de `dist/` puede publicarse en cualquier hosting estático. Las tipografías se cargan desde Google Fonts y tienen alternativas locales.

## Vercel

El archivo `vercel.json` configura el proyecto como una web estática, sin instalación ni compilación, y publica `dist/` como raíz del sitio. Al importar el repositorio, mantener el directorio raíz del proyecto en la raíz del repositorio. Los pushes a `main` disparan el despliegue mediante la integración de GitHub.

## Contacto y demostraciones

Todos los CTA de contacto abren WhatsApp al `5493794721825` con un mensaje relacionado con la sección. No envían mensajes automáticamente.

Los enlaces de SmartTurnos y MIGYM abren sus sitios reales en otra pestaña. Las representaciones de interfaces son ilustrativas y están identificadas como tales. No hay enlaces a plataformas de clientes de sorteos, ni se realizan ventas o reservas desde esta demo.

## Demo de sorteos

La demo se integra mediante un iframe de contenido propio y del mismo origen con `sandbox="allow-scripts allow-same-origin"`. Usa marca, precios, progreso, participantes y números ficticios. No integra las webs de los clientes, no conecta con procesadores de pago y no envía datos a ningún servidor. La consulta usa un email de ejemplo de solo lectura.
