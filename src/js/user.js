const tbody = document.querySelector('#productList')
const form = document.querySelector('#productForm')
const productName = document.querySelector('#productName')
const productPrice = document.querySelector('#productPrice')
const productQuantity = document.querySelector('#productQuantity')
const linkProductImage = document.querySelector('#productImageURL')
const productDescription = document.querySelector('#productDescription')

const URL_PRODUCT = 'http://localhost:3000/agriculturalProducts/'
let id

index()
form.addEventListener('submit', async (event) => {
    event.preventDefault()
    if (!id) {
        await create(productName.value, productPrice.value, productQuantity.value, linkProductImage.value, productDescription.value)
    } else {
        await updateProduct(id, productName.value, productPrice.value, productQuantity.value, linkProductImage.value, productDescription.value)
        id = undefined
    }
    await index()
    form.reset()
})

tbody.addEventListener('click', async (event) => {
    if (event.target.classList.contains('btn-danger')) {
        const id = event.target.getAttribute('data-id')
        await deleteProduct(id)
        await index()
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

async function find(id) {
    const response = await fetch(URL_PRODUCT + id)
    const data = await response.json()
    return data
}

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

async function index() {
    const response = await fetch(URL_PRODUCT)
    const data = await response.json()

    tbody.innerHTML = ''
    data.forEach(product => {
        tbody.innerHTML += `
        <td>${product.productName}</td>
        <td>${product.productPrice}</td>
        <td>${product.productQuantity}</td>
        <td><img width="100px" src=${product.linkProductImage} alt=${product.productName}></td>
        <td>${product.productDescription}</td>
        <td>
        <button type="button" data-id=${product.id} class="btn btn-danger ms-3">Delete</button>
        </td>
        <td>
        <button type="button" data-id=${product.id} class="btn btn-warning ms-3">Edit</button>
        </td>
        `
    })
}

async function updateProduct(id, productName, productPrice, productQuantity, linkProductImage, productDescription) {
    await fetch(URL_PRODUCT + id, {
        method: 'PUT',
        body: JSON.stringify({ productName, productPrice, productQuantity, linkProductImage, productDescription }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

async function deleteProduct(id) {
    await fetch(URL_PRODUCT + id, {
        method: 'DELETE'
    })
}