const URL_API = `http://localhost:3000/agriculturalProducts`
const URL_API_FAVORITES = `http://localhost:3000/favorite`

const sectionProducts = document.querySelector(".section-products")
const btnDetails = document.querySelector("#button-card-product")

index(sectionProducts);

async function index(sectionProducts) {
    const response = await fetch(URL_API);
    const products = await response.json();

    products.forEach(product => {
        sectionProducts.innerHTML += `
            <div class="card-product">
                <div class="face-card front-card">
                    <img class="img-card-product" src="${product.sale.linkProductImage}" alt="">
                    <h3 class="h3-card-product">${product.sale.productName}</h3>
                </div>
                <div class="face-card back-card" id="info-back-product">
                        <div>
                            <h3 class="h3-card-product" id="h3-card-product">${product.sale.productName}</h3>
                            <p class="p-card-product">${product.sale.productDescription}</p>
                        </div>
                        <div class="price-info">
                            <h3 class="h3-card-product"><span>$ </span>${product.sale.productPrice}<span> COP </span></h3>
                            <p class="p-card-product">Kilo</p>
                        </div>
                        <div class="price-info">
                            <button class="details-btn button-card-product"
                                data-product='${JSON.stringify(product)}'><b>Detalles</b></button>
                        </div>
                </div>
            </div>
        `;
    });

    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', function () {
            const product = JSON.parse(this.getAttribute('data-product'));
            document.getElementById('modal-product-image').src = product.sale.linkProductImage;
            document.getElementById('modal-product-name').innerText = product.sale.productName;
            document.getElementById('modal-product-description').innerText = product.sale.productDescription;
            document.getElementById('modal-product-price').innerText = `$ ${product.sale.productPrice} COP`;
            document.getElementById('modal-owner-name').innerText = product.ownerName;
            document.getElementById('modal-owner-lastname').innerText = product.ownerLastName;
            document.getElementById('modal-owner-town').innerText = product.ownerTown;

            document.querySelector('#ul-contact-owner a[href^="mailto:"]').href = `mailto:${product.ownerEmail}`;
            document.querySelector('#ul-contact-owner a[href^="tel:"]').href = `tel:${product.ownerPhoneNumber}`;
            document.querySelector('#ul-contact-owner a[href^="https://wa.me/"]').href = `https://wa.me/${product.ownerNumberWhatsapp}`;


            const myModal = new bootstrap.Modal(document.getElementById('product-modal'));
            myModal.show();

            document.getElementById('button-card-product').onclick = function() {
                addToFavorites(product);
            };
        });
    });
}


export async function addToFavorites(product) {
    const response = await fetch(URL_API_FAVORITES)
    const favorite = await response.json()
    
    let productExist = false

    for (let i = 0; i < favorite.length; i++) {
        if (favorite[i].id === product.id) {
            productExist = true
            alert(`el producto ${favorite[i].productName} ya existe en favoritos`)
            break
        }
    }
    if (!productExist) { 
        await fetch(URL_API_FAVORITES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
    }
}
