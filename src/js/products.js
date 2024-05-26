const URL_API = `http://localhost:3000/agriculturalProducts`
const sectionProducts = document.querySelector(".section-products")

index(sectionProducts);

async function index(sectionProducts) {
    const response = await fetch(URL_API);
    const products = await response.json();

    products.forEach(product => {
        sectionProducts.innerHTML += `
            <div class="card-product">
                <div class="face-card front-card">
                    <img class="img-card-product" src="${product.linkProductImage}" alt="">
                    <h3 class="h3-card-product">${product.productName}</h3>
                </div>
                <div class="face-card back-card" id="info-back-product">
                        <div>
                            <h3 class="h3-card-product">${product.productName}</h3>
                            <p class="p-card-product">${product.productDescription}</p>
                        </div>
                        <div class="price-info">
                            <h3 class="h3-card-product"><span>$ </span>${product.productPrice}<span> COP </span></h3>
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
            document.getElementById('modal-product-image').src = product.linkProductImage;
            document.getElementById('modal-product-name').innerText = product.productName;
            document.getElementById('modal-product-description').innerText = product.productDescription;
            document.getElementById('modal-product-price').innerText = `$ ${product.productPrice} COP`;
            const myModal = new bootstrap.Modal(document.getElementById('product-modal'));
            myModal.show();
        });
    });
}