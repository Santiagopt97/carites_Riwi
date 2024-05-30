const tbody = document.querySelector('#productList')
const form = document.querySelector('#productForm')
const productName = document.querySelector('#productName')
const productPrice = document.querySelector('#productPrice')
const productQuantity = document.querySelector('#productQuantity')
const linkProductImage = document.querySelector('#productImageURL')
const productDescription = document.querySelector('#productDescription')
const btnLogout = document.querySelector('#logout-button')


const URL_PRODUCT = 'http://localhost:3000/agriculturalProducts/'

let id

// Function de logout
btnLogout.addEventListener('click', () => {
    // Delete user information from localStorage
    localStorage.removeItem('userOnline')
    // Redirect user to login page
    window.location.href = '/'
})

index()

// Event listener submit to call the create and update function and save the data
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (!id) {
        await create(productName.value, productPrice.value, productQuantity.value, linkProductImage.value, productDescription.value)
    }else {
        await updateProduct(id, productName.value, productPrice.value, productQuantity.value, linkProductImage.value, productDescription.value)
        id = undefined
    } 
    await index()
    form.reset()
})

// Event listener click to execute the delete and update function.
tbody.addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn-danger')) {
        const id = event.target.getAttribute('data-id')
        const isConfirmed = confirm("¿Estás seguro de que quieres eliminar este producto?");
        if (isConfirmed) {
            await deleteProduct(id);
            await index();
        }
    } else if (event.target.classList.contains('btn-warning')) {
        id = event.target.getAttribute('data-id')
        const productFound = await find(id)
        productName.value = productFound.productName
        productPrice.value = productFound.productPrice
        productQuantity.value = productFound.productQuantity
        linkProductImage.value = productFound.linkProductImage
        productDescription.value = productFound.productDescription
    }
})

// function search for a product by id in the api
async function find(id) {
    const response = await fetch(URL_PRODUCT + id)
    const data = await response.json()
    return data
}

// function create product in product table and save it with the corresponding user credentials
async function create(productName, productPrice, productQuantity, linkProductImage, productDescription) {
    const user = JSON.parse(localStorage.getItem('userOnline'))
    const newProducts = {
        productName, productPrice, productQuantity, linkProductImage, productDescription, ownerAgricola: {
            ownerName: user.ownerName,
            ownerLastName: user.ownerLastName,
            ownerDocument: user.ownerDocument,
            ownerTown: user.ownerTown,
            ownerPhoneNumber: user.ownerPhoneNumber,
            ownerEmail: user.ownerEmail,
            ownerNumberWhatsapp: user.ownerNumberWhatsapp
        }
    }
    await fetch(URL_PRODUCT, {
        method: 'POST',
        body: JSON.stringify(newProducts),
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

// function list products in table by farmer
async function index() {
    const user1 = JSON.parse(localStorage.getItem('userOnline'));

    if (!user1) {
        alert("Debes iniciar sesión para ver tus productos.");
        return;
    }


    const response = await fetch(URL_PRODUCT);
    const data = await response.json();

    // filter products of logged user
    const userProducts = data.filter(product =>
        product.ownerAgricola && product.ownerAgricola.ownerEmail === user1.ownerEmail
    );

    // clean tbody content
    tbody.innerHTML = '';

    // add user products to the tbody
    userProducts.forEach(product => {
        tbody.innerHTML += `
            <tr>
                <td>${product.productName}</td>
                <td>${product.productPrice}</td>
                <td>${product.productQuantity}</td>
                <td><img width="100px" src="${product.linkProductImage}" alt="${product.productName}"></td>
                <td>${product.productDescription}</td>
                <td>
                    <button type="button" data-id="${product.id}" class="btn btn-danger ms-3">Eliminar</button>
                </td>
                <td>
                    <button type="button" data-id="${product.id}" class="btn btn-warning ms-3">Editar</button>
                </td>
            </tr>
            `;
    });

}

// function update existing product by id in product table 

async function updateProduct(id, productName, productPrice, productQuantity, linkProductImage, productDescription) {
    const user = JSON.parse(localStorage.getItem('userOnline'));
    await fetch(URL_PRODUCT + id, {
        method: 'PUT',
        body: JSON.stringify({
            id,productName, productPrice, productQuantity, linkProductImage, productDescription, ownerAgricola: {
                ownerName: user.ownerName,
                ownerLastName: user.ownerLastName,
                ownerDocument: user.ownerDocument,
                ownerTown: user.ownerTown,
                ownerPhoneNumber: user.ownerPhoneNumber,
                ownerEmail: user.ownerEmail,
                ownerNumberWhatsapp: user.ownerNumberWhatsapp
            }
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
// function delete existing product by id in product table
async function deleteProduct(id) {
    await fetch(URL_PRODUCT + id, {
        method: 'DELETE'
    })
}