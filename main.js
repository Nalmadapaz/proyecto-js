const productos = [
  { nombre: "Producto 1", precio: 100 },
  { nombre: "Producto 2", precio: 150 },
  { nombre: "Producto 3", precio: 170 },
  { nombre: "Producto 4", precio: 222 },
  { nombre: "Producto 5", precio: 500 },
];

function mostrarProductos() {
  console.log("Lista de productos disponibles:");
  for (let i = 0; i < productos.length; i++) {
    console.log(`${i + 1}. ${productos[i].nombre} - $${productos[i].precio}`);
  }
}

function simulador() {
  console.log("¡Bienvenido a mi tienda!");
  mostrarProductos();

  let seleccion;
  let productoElegido;

  while (true) {
    seleccion = parseInt(prompt("Elija un número de producto (1-5):"));

    if (seleccion >= 1 && seleccion <= 5) {
      productoElegido = productos.find((_, index) => index === seleccion - 1);
      console.log(`Ha seleccionado: ${productoElegido.nombre}`);
      break;
    } else {
      console.log(
        "Selección no válida. Por favor, elija un número de producto entre 1 y 5."
      );
    }
  }

  const cantidad = parseInt(
    prompt(`¿Cuántas unidades de ${productoElegido.nombre} desea comprar?`)
  );

  const costoTotal = productoElegido.precio * cantidad;
  console.log(`El costo total es: $${costoTotal}`);

  const carrito = [productoElegido];
  console.log("Carrito de compra:", carrito);
}

simulador();
