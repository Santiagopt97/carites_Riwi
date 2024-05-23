const URL_API = `http://localhost:3000/agriculturalProducts`
const sectionProducts = document.querySelector(".section-products")

document.addEventListener('DOMContentLoaded', () => {
    index(sectionProducts);
})

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
                            <button class="button-card-product"><b><a class="a-card-car" href="#">Agregar al
                                        Carrito</a></b></button>
                            <button class="details-btn button-card-product"><b>Detalles</b></button>
                        </div>
                </div>
            </div>
        `;
    });
}