# Anexos

En esta carpeta se encuentran los anexos para los documentos. Los anexos son exportaciones de las tablas en formatos csv que se utilizaron para la generación de los gráficos y tablas en el informe.

La base de datos no relacional se encuentra [aquí](https://www.notion.so/recolor-jacarandas/1186f9b6905380c59a0be287853820f1?v=953fc425d1724fdfbb6b63ed856c7397)

## Diccionario de Datos

Cada campo puede tener una connotación diferente según la vista a la cuál se hace referencia. Aquí se encuentra el detalle:

La Base de datos es no relacional. Toda la información es una única tabla en Notion.

Las diferentes vistas permiten filtrar según qué quieres ver:

- Full View: Muestra todos los campos
- Test Cases: Muestra los TCs y sus pasos
    - Campos: Código, descripción, severidad, precondiciones, resultado esperado, evidencia, documentación, estado ejecución.
- Bugs: Muestra los Bugs y sus pasos para su reproducción
    - Campos: Código, descripción, Resultado esperado, evidencia, estado actual, severidad, detectado con, fecha detección, fecha corrección, TMR, estado ejecución.
- Accesibility Issues: Muestra los problemas de accesibilidad 
    - Campos: Código, descripción, severidad, estado ejecución, evidencia, evidencia corrección.

A continuación se desglosa cada propiedad:

- **Código:** Es el ID único de cada fila, debe seguir este formato: `TC-JH-01`, `BG-JH-01`, `AX-JH-01`. Donde `JH` es el código de las iniciales del módulo 'Jhonson'. Si se trata de un paso para un TC o BG entonces la estructura es `01-01` el componente debe estar como hijo del TC o BG correspondiente (ver propiedad `Parent Item`).

- **Descripción:** Describe el TC, BG o AX. Si es un paso define la acción a realizar.

- **Resultado esperado:** Define el resultado esperado para un paso de un TC, o el comportamiento de un BG _(No aplica para AX)_.

- **Resultado Actual:** Define el resultado actual para un BG _(No aplica para TC o AX)_.

- **Severidad:** Define la severidad del TC, BG o AX. Los valores posibles son: `Low`, `Medium`, `High`

- **Precondiciones:** Define las condiciones necesarias para ejecutar el TC, es opcional en BG y AX.

- **Estado ejecución:** Define el estado de ejecución del TC, proceso de solución de un BG o AX. Si es un TC sus valores posibles son: `TODO`, `Executing`, `Passed`, `Failed`. Si es un BG o AX sus valores posibles son: `TODO`, `Executing`, `Solved`, `Not Solved`.

- **Evidencia:** Guarda archivos que demuestran la ejecución de un TC, el estado acual de un BG o AX. Es opcional en los pasos y TCs que no lo requieran.

- **Evidencia Corrección:** Guarda archivos que demuestran la corrección de un BG o AX. _(No aplica para TCs)_.

- **Documentación:** Es una conexión con los [Issues en GitHub](https://github.com/go-to-hell/proyecto-grafos-front/issues) debe relacionar cada TC con una HU. _(No aplica para BG o AX)_.

- **Detectado con:** Es un campo relacional que define el TC con la que se detectó el BG. _(No aplica para TC, opcional en AX)_.

- **Type:** Define el tipo de item, los valores posibles son: `TC`, `BG`, `AX`.

- **OrderInView:** Define el orden en que se visualizan los items en las vistas. _(Oculto en todas las vistas impresas, solo existe para la exportación)_.

- **Parent Item:** Es una autorrelación en la tabla del objeto padre. Se asigna automáticamente al crear un paso para un TC o BG. _(Oculto en todas las vistas)_.

- **Sub-items:** Es una relación en la tabla del objeto hijo. Se asigna automáticamente al crear un TC o BG. _(Oculto en todas las vistas)_.

- **Fecha detección:** Define la fecha en que se detectó el BG. _(No aplica para TC, opcional en AX)_.

- **Fecha corrección:** Define la fecha en que se corrigió el BG. _(No aplica para TC, opcional en AX)_

- **TMR:** Define el tiempo medio de resolución de un BG. Se calcula automáticamente cuando se tienen los campos `Fecha detección` y `Fecha corrección`. _(No aplica para TC, opcional en AX)_.

- **Principio afectado:** Define el principio de WCAG AA 2.0 afectado por el AX. _(No aplica para TC o BG)_.

## Exportaciones

- **Exportar una vista:** Para exportar una vista, primero se extraerá un HTML de la vista deseada. Luego desde el HTML se creará un PDF configurado para esa vista en particular.

- **Exportar un subconjunto de datos:** Para exportar un subconjunto de datos, se seleccionarán las filas y propiedades deseadas dentro de una vista temporal, esta se exportará directamente a PDF o CSV según se requiera para insertarlo en el informe.

## Pendientes

1. TODO: En los AXs están agrupados por el tipo de problema, se debe desagregar para cada incidencia, en cada vista, por separado.

2. TODO: En los BGs se faltan evidencias de corrección y descripción de estado actual.

3. TODO: Completar con los TCs del resto del equipo.