const productos = [
  { nombre: "Nyke Phantom", precio: 100 },
  { nombre: "Nyker Mercurial", precio: 150 },
  { nombre: "Nyke Premier", precio: 170 },
  { nombre: "Nyke Tiempo", precio: 222 },
  { nombre: "Nyke Phantom GX", precio: 500 },
];

function mostrarProductos() {
  const productosContainer = document.getElementById("productos-container");
  productosContainer.innerHTML = '<h2>Lista de productos disponibles:</h2>';

  productos.forEach((producto,index) => {
    const productoDiv = document.createElement("div");
    productoDiv.innerHTML = `${index + 1}. ${producto.nombre} - $${producto.precio}`;
    productosContainer.appendChild(productoDiv);
  })
}

function manejarSeleccion() {
  const seleccionInput = document.getElementById("seleccion-input");
  const seleccion = parseInt(seleccionInput.value);

  if (seleccion >= 1 && seleccion <= 5) {
    const productoElegido = productos.find((_, index) => index === seleccion - 1);
    mostrarMensaje(`Ha seleccionado: ${productoElegido.nombre}`);
  } else {
    mostrarMensaje("Selección no válida. Por favor, elija un número de producto entre 1 y 5.");
  }
}

function mostrarMensaje(mensaje) {
  const mensajeDiv = document.createElement("div");
  mensajeDiv.innerHTML = `<p>${mensaje}</p>`;
  document.body.appendChild(mensajeDiv);
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  const seleccionForm = document.getElementById("seleccion-form");
  seleccionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    manejarSeleccion();
  });
});
