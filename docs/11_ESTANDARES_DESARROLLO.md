# Estándares de desarrollo

## TypeScript

Todo el código debe ser TypeScript.

No crear archivos JavaScript.

## Tipado

No utilizar `any`.

No utilizar `@ts-ignore`.

No ocultar errores de TypeScript.

## React

Usar componentes funcionales.

No utilizar componentes de clase.

## Bootstrap

Utilizar Bootstrap 5.

No utilizar Tailwind CSS.

No utilizar Material UI.

No introducir otra librería de componentes visuales salvo decisión explícita.

## Componentes

Cada componente debe tener una responsabilidad clara.

Evitar componentes monolíticos.

## Nombres

Componentes: PascalCase.

Funciones y variables: camelCase.

Tipos e interfaces: PascalCase.

Constantes: preferentemente UPPER_SNAKE_CASE cuando sean constantes globales.

## Fechas

Utilizar un formato interno consistente para fechas.

No realizar operaciones de fechas mediante manipulación de strings cuando pueda producir errores.

Centralizar las funciones de cálculo de días laborables.

## Reglas de negocio

No poner reglas complejas directamente dentro del JSX.

Extraerlas a funciones, utilidades o servicios.

## Mock

Los componentes no deben modificar directamente los arrays importados de mock.

Los servicios o una capa de estado deben controlar las modificaciones.

## CSS

Priorizar clases Bootstrap.

El CSS personalizado debe estar justificado.

## Responsive

La aplicación debe ser usable en escritorio y tablet.

## Accesibilidad

Utilizar:

- etiquetas semánticas;
- labels;
- botones adecuados;
- atributos ARIA cuando sean necesarios;
- foco visible;
- contraste suficiente.

## Errores

Mostrar mensajes claros al usuario.

No mostrar errores técnicos internos en la interfaz.

## Código

Evitar:

- duplicación;
- funciones innecesariamente grandes;
- abstracciones prematuras;
- dependencias innecesarias;
- código muerto;
- console.log de depuración en la versión final del prototipo.

## Dependencias

No instalar una librería nueva si Bootstrap, React o las utilidades existentes permiten resolver correctamente el problema.
