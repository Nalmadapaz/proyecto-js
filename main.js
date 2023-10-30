const productsContainer = document.getElementById('products-container');
const productos = [
    { id: 1, nombre: "Nyke Phantom", precio: 100, stock: 10 },
    { id: 2,  nombre: "Nyke Mercurial", precio: 150, stock: 8 },
    { id: 3, nombre: "Nyke Premier", precio: 170, stock: 5 },
    { id: 4, nombre: "Nyke Tiempo", precio: 222, stock: 12 },
    { id: 5, nombre: "Nyke Phantom GX", precio: 500, stock: 3 },
];

function mostrarMensaje(mensaje) {
    const mensajeDiv = document.createElement("div");
    mensajeDiv.innerHTML = `<p>${mensaje}</p>`;
    document.getElementById("mensaje-container").appendChild(mensajeDiv);
}

function finalizarCompra() {
    const productosSeleccionados = JSON.parse(localStorage.getItem("productoElegido")) || [];

    if (productosSeleccionados.length > 0) {
        const total = productosSeleccionados.reduce((sum, producto) => sum + producto.precio, 0);
        mostrarMensaje(`Compra finalizada. Total: $${total}`);
        localStorage.setItem("productoElegido", JSON.stringify([]));
        mostrarProductos(); 
    } else {
        mostrarMensaje("No hay productos seleccionados para comprar. Por favor, elija al menos un producto.");
    }
}

const getProducts = () => {
    return JSON.parse(localStorage.getItem('products'));
}

const getSelectedProducts = () => {
    return JSON.parse(localStorage.getItem('selectedProducts'));
}

const listProducts = () => {
    const products = getProducts();
    productsContainer.innerHTML = '<h2>Lista de productos disponibles:</h2>';
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `${index + 1}. ${product.nombre} - $${product.precio}`;
        productsContainer.appendChild(productDiv);
    });
}

const getProduct = (id) => {
    const products = getProducts(); 
    return products.find((product) => product.id === id);
}

const selectProduct = (e) => {
    e.preventDefault()
    const seleccionInput = document.getElementById("seleccion-input");
    const seleccion = parseInt(seleccionInput.value);
    const selectedProduct = getProduct(seleccion);

    if (seleccion >= 1 && seleccion <= 5 && selectedProduct && selectedProduct.stock > 0) {
        const productoElegido = JSON.parse(localStorage.getItem('selectedProducts')) || [];

        productoElegido.push(selectedProduct);
    
        localStorage.setItem("selectedProducts",JSON.stringify(productoElegido));
        mostrarMensaje(`Ha seleccionado: ${productos[seleccion-1].nombre}`);
    }else{
        mostrarMensaje("Seleccion no valida. Por favor, elija un numero de producto entre 1 y 5.");
    }
}

const mostrarProductos = () => {
    const productosContainer = document.getElementById("products-container");
    const productosGuardados = getSelectedProducts();

    productosContainer.innerHTML = '<h2>Lista de productos disponibles:</h2>';

    productosGuardados.forEach((producto, index) => {
        const productoDiv = document.createElement("div");
        productoDiv.innerHTML = `${index + 1}. ${producto.nombre} - $${producto.precio}`;
        productosContainer.appendChild(productoDiv);
    });
}

const addProduct = (id) => {
    const products = getProducts();
    const product = getProduct(id);
    const selectedProducts = localStorage.getItem('selectedProducts');

    if (product) {
        selectedProducts.push(product);
    } else {
        console.log('Producto no encontrado');
    }

    localStorage.setItem('products', JSON.stringify(products));
    listProducts();
}

const finishPurchase = (e) => {
    e.preventDefault();
    const selectedProducts = getSelectedProducts();

    if (selectedProducts?.length > 0) {
        const total = selectedProducts.reduce((sum, producto) => sum + producto.precio, 0);
        mostrarMensaje(`Compra finalizada. Total: $${total}`);
        mostrarProductos();
        localStorage.removeItem('selectedProducts');
    } else {
        mostrarMensaje("No hay productos seleccionados para comprar. Por favor, elija al menos un producto.");
    }
}

const getTasks = async() => {
    const result = await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => console.log(data));
}

const getTask = async(id) => {
    const result = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(data => console.log(data));
    return result;
}

(async() => {
    localStorage.setItem('products', JSON.stringify(productos));
    listProducts();
    await getTasks();
    await getTask(1);
    await requestHTTP('GET', '/todos');
})();

const requestHTTP = async(method = 'GET', path = '', val) => {
    const URL = `https://jsonplaceholder.typicode.com${path}`;
    const result = await fetch(URL, {
            method,
            ...(val ? {body: val} : {}),
        })
        .then(response => response.json())
        .then(data => data);
    console.log(result);
}