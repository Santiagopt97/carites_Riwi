const URL = "http://localhost:3000/agriculturalProducts"
const section = document.querySelector("#section")

async function index() {
    const response = await fetch(URL)
    const data = await response.json()

    data.forEach(element => {
        section.innerHTML += `
        <article id="borde" class="row g-0 ">
            <div class="col-md-4 text-center ">
                <img src="${element.linkProductImage}" class='img-fluid ms-3 image' alt="${element.productName}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${element.productName}</h5>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text"><small class="text-body-secondary">${element.productPrice}</p>
                </div>
                <div class="d-flex justify-content-between ">
                    <div>
                        <td>
                            <button type="button" data-id=${element.id} class="btn btn-warning">Edit</button>
                            <button type="button" data-id=${element.id} class="btn btn-danger">Delete</button>
                        </td>
                    </div>
                    
                    <div>
                        <td>
                            <button type="button" data-id=${element.id} class="btn btn-warning">Edit</button>
                            <button type="button" data-id=${element.id} class="btn btn-danger">Delete</button>
                        </td>
                    </div>
                </div>
            </div>
        </article>
        
        `
    })
}

index()