const URL = "http://localhost:3000/agriculturalProducts"
const section = document.querySelector("#section")

async function index() {
    const response = await fetch(URL)
    const data = await response.json()

    data.forEach(element => {
        section.innerHTML += `
        <article id="article" class="card mb-3 cards">
                <div id="card-id" class="row g-0 ">
                    <div id="img-card" class="col-md-4 text-center ">
                        <img src="${element.linkProductImage}" class='img-fluid ms-3 image' alt="${element.productName}">
                    </div>
                    <div id="text-card" class="col-md-8">
                        <div class="card-body d-flex flex-column justify-content-center ">
                            <h2 id="titulo" class="card-title title text-capitalize ">${element.productName}</h2>
                            <p class="card-text paragraph text-capitalize">${element.productDescription}</p>
                            <p class="card-text paragraph ">${element.productPrice}</p>
                        </div>
                        <div class="d-flex justify-content-between ">
                            <div>
                                <a><i class="bi bi-whatsapp"></i></a>
                                <button type="button" data-id=${element.id} class="btn btn-danger">Telefono</button>
                            </div>
                            
                            <div>
                                <button type="button" data-id=${element.id} class="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
              </article>
        `
    })
}

index()