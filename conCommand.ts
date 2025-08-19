/*class Producto {
constructor(public nombre: string, public precio: number) {}
}*/

interface Producto {
    nombre: string;
    precio: number;
}

class Carrito {
    private producto: Producto[] = [];

    agregarProducto (producto: Producto) {
        this.producto.push(producto);
        console.log(`${producto.nombre} - $${producto.precio} * Agregando al carrito *`);
    }

    eliminarProducto(producto: Producto) {
        this.producto = this.producto.filter(i => i.nombre !== producto.nombre);
        console.log(`${producto.nombre} * Eliminando del carrito *`);
    }

    mostrarProductos() {
        console.log("------------------");
        console.log("Carrito:");
        if (this.producto.length === 0) {
        console.log("No hay productos agregados a su pedido");
        console.log("------------------");
        return;
    }

        this.producto.forEach(p => console.log(`- ${p.nombre} $${p.precio}`));
        console.log("------------------");
    }
}

interface Command {
    execute(): void;
    undo(): void;
}

class AgregarProductoCommand implements Command {
    constructor(private carrito: Carrito, private producto: Producto) {}

    execute() {
        this.carrito.agregarProducto(this.producto);
    }
    undo() {
        this.carrito.eliminarProducto(this.producto);
    }
}

class EliminarProductoCommand implements Command {
    constructor(private carrito: Carrito, private producto: Producto) {}
    execute() {
        this.carrito.eliminarProducto(this.producto);
    }
    undo() {
        this.carrito.agregarProducto(this.producto);
    }
}

class CarritoInvoker{
    private historial: Command[] = [];
    executeCommand(command: Command) {
        command.execute();
        this.historial.push(command);
    }
    undo() {
        const command = this.historial.pop();
        if (command) {
        console.log("Deshaciendo última acción...");
        command.undo();
        }
    }
}


//crear carrito e invoker
const carrito = new Carrito();
const invoker= new CarritoInvoker();

//uso de la interfaz producto para creacion
const manzana = { nombre: "Manzana", precio: 500 };
const gaseosa = { nombre: "Pepsi 500ml", precio: 1500 };

//crear los commands especificos para cada accion
const agregarManzana = new AgregarProductoCommand(carrito, manzana);
const agregarGaseosa = new AgregarProductoCommand(carrito, gaseosa);

const eliminarManzana = new EliminarProductoCommand(carrito, manzana);
const eliminarGaseosa = new EliminarProductoCommand(carrito, gaseosa);

//ejecutamos commands desde el invoker
invoker.executeCommand(agregarManzana);
invoker.executeCommand(agregarGaseosa);

carrito.mostrarProductos();
//deshacer el agregar gaseosa
invoker.undo();
carrito.mostrarProductos();

//elimina la manzana del carrito (¡importante, esto no es undo, es eliminar producto especifico!)
invoker.executeCommand(eliminarManzana);
carrito.mostrarProductos();

//aca si es undo y deshace la ultima accion que fue eliminar la manzana
invoker.undo();
carrito.mostrarProductos();
