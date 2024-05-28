const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
let products = [];

// Función para agregar un nuevo producto
function addProduct(event) {
    event.preventDefault();
    
    // Obtener los valores del formulario
    const name = document.getElementById('productName').value;
    const price =document.getElementById('productPrice').value;
    const quantity =document.getElementById('productQuantity').value;
    const imageURL = document.getElementById('productImageURL').value;
    const description = document.getElementById('productDescription').value;
    
    // Crear un objeto de producto
    const product = {
        id: Date.now(), // ID único generado con la marca de tiempo
        name: name,
        price: price,
        quantity: quantity,
        imageURL: imageURL,
        description: description
    };

    // Agregar el producto a la lista
    products.push(product);
    
    // Limpiar el formulario
    productForm.reset();
    
    // Actualizar la tabla de productos
    renderProducts();
}

// Función para renderizar la tabla de productos
function renderProducts() {
    // Limpiar la tabla de productos


    productList.innerHTML = '';
    // Iterar sobre la lista de productos y crear filas para la tabla
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>public/data/database.json
            <td>${product.quantity}</td>
            <td>${product.imageURL}</td>
            <td>${product.description}</td>            `
            productList.appendChild(row);
    });
}
function deleteProduct(productId) {
    products = products.filter(product => product.id !== productId);
    renderProducts();
}

// Escuchar el evento de envío del formulario para agregar un nuevo producto
productForm.addEventListener('submit', addProduct);

// Renderizar la tabla de productos inicial
renderProducts();

