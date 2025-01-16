/****************************************************
            SISTEMA DE VENTAS EN JS
*****************************************************/

//Clase Producto
class Producto {
    static contadorProductos = 0;

    constructor(nombre, precio, categoria, stock) {
        this.idProducto = ++Producto.contadorProductos;
        this.nombre = nombre;
        this.precio = precio > 0 ? precio : 0; // Aseguramos que el precio no sea negativo
        this.categoria = categoria;
        this.stock = stock;
    }

    // Obtiene el ID del producto
    getIdProducto() {
        return this.idProducto;
    }

    // Obtiene el nombre del producto
    getNombre() {
        return this.nombre;
    }

    // Establece el nombre del producto
    setNombre(nombre) {
        this.nombre = nombre;
    }

    // Obtiene el precio del producto
    getPrecio() {
        return this.precio;
    }

    // Establece el precio del producto asegurando que no sea negativo
    setPrecio(precio) {
        if (precio >= 0) {
            this.precio = precio;
        } else {
            console.log("El precio no puede ser negativo");
        }
    }

    // Obtiene la categoría del producto
    getCategoria() {
        return this.categoria;
    }

    // Establece la categoría del producto
    setCategoria(categoria) {
        this.categoria = categoria;
    }

    // Obtiene el stock del producto
    getStock() {
        return this.stock;
    }

    // Establece el stock del producto asegurando que no sea negativo
    setStock(stock) {
        if (stock >= 0) {
            this.stock = stock;
        } else {
            console.log("El stock no puede ser negativo");
        }
    }

    // Disminuye el stock en una cantidad específica
    disminuirStock(cantidad) {
        if (this.stock >= cantidad) {
            this.stock -= cantidad;
        } else {
            console.log("No hay suficiente stock disponible");
        }
    }

    // Representación del producto 
    toString() {
        return `idProducto: ${this.idProducto}, nombre: ${this.nombre}, precio: ${this.precio}, categoria: ${this.categoria}, stock: ${this.stock}`;
    }
}

// Clase Orden
class Orden {
    static contadorOrdenes = 0;

    //número máximo de productos por orden
    static get MAX_PRODUCTOS() {
        return 5;
    }

    constructor() {
        this.idOrden = ++Orden.contadorOrdenes;
        this.productos = [];
    }

    // Obtiene el ID de la orden
    getIdOrden() {
        return this.idOrden;
    }

    // Agrega un producto a la orden si hay espacio y stock disponible
    agregarProducto(producto) {
        if (this.productos.length < Orden.MAX_PRODUCTOS) {
            if (producto.getStock() > 0) {
                producto.disminuirStock(1);
                this.productos.push(producto);
            } else {
                console.log(`El producto ${producto.getNombre()} no tiene stock disponible.`);
            }
        } else {
            console.log("No se pueden agregar más productos a la orden");
        }
    }

    // Calcula el total de la venta aplicando descuentos si corresponde
    calcularTotal() {
        let totalVenta = 0;
        for (const producto of this.productos) {
            let precioProducto = producto.getPrecio();
            if (producto.getCategoria() === "electronica") {
                precioProducto *= 0.9; // Aplicar 10% de descuento
            }
            totalVenta += precioProducto;
        }
        return totalVenta;
    }

    // Calcula los impuestos sobre el total de la venta
    calcularImpuestos() {
        return this.calcularTotal() * 0.15; // 15% de impuestos
    }

    // Muestra la información de la orden
    mostrarOrden() {
        let productosOrden = "";
        for (const producto of this.productos) {
            productosOrden += `\n ${producto.toString()}\n`;
        }
        console.log(`Orden: ${this.idOrden}, Total: $${this.calcularTotal().toFixed(2)}, Impuestos: $${this.calcularImpuestos().toFixed(2)}, Productos: ${productosOrden}`);
    }

    // Lista los productos en la orden ordenados por precio descendente
    listarProductosPorPrecioDesc() {
        return this.productos.slice().sort((a, b) => b.getPrecio() - a.getPrecio());
    }
}

// Ejemplos de uso
let producto1 = new Producto("Pantalon", 200, "ropa", 10);
let producto2 = new Producto("Vestido", 300, "ropa", 5);
let producto3 = new Producto("Televisor", 1000, "electronica", 2);
let producto4 = new Producto("Zapatos", 60, "calzado", 8);
let producto5 = new Producto("Celular", 800, "electronica", 3);

// Mostrar productos creados
console.log(producto1);
console.log(producto2);

// Crear una nueva orden y agregar productos
let orden1 = new Orden();
orden1.agregarProducto(producto1);
orden1.agregarProducto(producto2);
orden1.agregarProducto(producto3);
orden1.mostrarOrden();

// Crear una segunda orden y agregar productos
let orden2 = new Orden();
orden2.agregarProducto(producto3);
orden2.agregarProducto(producto4);
orden2.agregarProducto(producto5);
orden2.agregarProducto(producto1);
orden2.agregarProducto(producto2);
orden2.mostrarOrden();

// Mostrar productos ordenados por precio descendente
console.log("Productos ordenados por precio descendente:");
const productosOrdenados = orden2.listarProductosPorPrecioDesc();
productosOrdenados.forEach((producto) => console.log(producto.toString()));
