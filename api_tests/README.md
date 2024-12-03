# Automatización de Pruebas de API

## Descripción
Este proyecto contiene la automatización de pruebas de la API de la aplicación algoritmos de gestión de rutas de teleférico "Bajo Esquina". Las pruebas están diseñadas para ejecutarse en la librería de postman `newman`.

## Comandos

### Instalación de dependencias
```bash
npm install --save-dev newman
```

### Correr pruebas
```bash
newman run api_tests/ALGO-endpointTesting.postman_collection.json -e api_tests/ALGO-Local.postman_environment.json
```

## Tareas Pendientes

1. TODO: Crear environment para las pruebas.
2. TODO: Crear un pre-request script para la creación de datos de prueba.
3. TODO: Crear un post-request script que contenga los assertions de cada endpoint. (min 5)