//sin command no separo las acciones sino que las agrego como métodos a la clase correspondiente

interface Producto {
  //propiedades publicas
  nombre: string;
  precio: number;
}

//Carrito es el receptor en este caso
class Carrito {
  //prop privadas
  // productos mejor que items cuando no usamos Command
  private Productos: Producto[] = [];

  //métodos
  public agregarProducto(producto: Producto): void {
    this.Productos.push(producto);
    console.log(`Agregaste ${producto.nombre}`);
  }

  public eliminarProducto(producto: Producto): void {
    this.Productos = this.Productos.filter((p) => p.nombre !== producto.nombre);
    console.log(`\n Eliminaste ${producto.nombre} con éxito`);
  }

  public mostrarPedido(): void {
    console.log("\n Detalle del pedido ");
    if (this.Productos.length === 0) {
      console.log("No hay productos agregados a su pedido");
      return; // actúa como un break de js
    } else {
      this.Productos.forEach((p) => console.log(`${p.nombre} $${p.precio}`));
    }
  }
}

//Uso interfaz Producto
const fruta1 = { nombre: "Manzana", precio: 500 };
const fruta2 = { nombre: "Pera", precio: 300 };

// Creo un nuevo carrito
const miCarrito = new Carrito();

// Agrego cada producto al carrito
miCarrito.agregarProducto(fruta1);
miCarrito.agregarProducto(fruta2);

// Muestro el estado actual del carrito
miCarrito.mostrarPedido();

// Elimina un producto
miCarrito.eliminarProducto(fruta2);

// Muestra el carrito después de eliminar un producto
miCarrito.mostrarPedido();
