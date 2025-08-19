# Patrón Command en Carrito de Compras
Este repositorio contiene dos ejemplos de implementación en TypeScript:
1. Versión sin Command: la clase maneja directamente las acciones de agregar, eliminar y mostrar productos.
2. Versión con Command: se utiliza el patrón de diseño Command para separar las acciones de la lógica del carrito y permitir funcionalidades como deshacer (undo).

## Diferencias principales
- Sin Command:
  - La clase Carrito concentra toda la lógica.
  - Es más sencillo, pero poco flexible para extender con nuevas funcionalidades.

- Con Command:
  - Se crean comandos específicos (AgregarProductoCommand, EliminarProductoCommand) que encapsulan cada acción implementando de Command.
  - Un invoker ejecuta los comandos y mantiene un historial para poder deshacer acciones.

## Uso de interface en Producto
Se define una interface `Producto` con las propiedades `nombre` y `precio`. Esto permite:
- Asegurar que todos los productos cumplan con estas propiedades mínimas.
- Crear objetos literales o clases distintas que representen productos, siempre que respeten la interfaz.
- Evitar acoplar el sistema a una única implementación de producto y ganar flexibilidad.
