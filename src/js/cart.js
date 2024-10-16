// database called and declaration of variables
const URL = "https://carites-db.vercel.app/favorite/"
const section = document.querySelector("#section")
const divDelete = document.querySelector("#div-delete")
let id


// eventlistener btn-danger
section.addEventListener("click", async function(event){
    if (event.target.classList.contains("btn-danger")) {
        const id = event.target.getAttribute("data-id")
        await deleteItem(id) 
        await index() 
    }
})


// card function and we send it to the HTML
async function index() {
    
    const response = await fetch(URL)

    
    const data = await response.json()

    
    data.forEach(element => {

        //card painting with innerhtml
        divDelete.innerHTML += `
        <article id="article" class="card mb-3 cards">
                <div id="card-id" class="row g-0 ">
                    <div id="img-card" class="col-md-4 text-center ">
                        <img src="${element.linkProductImage}" class='img-fluid ms-3 image' alt="${element.productName}">
                    </div>
                    <div id="text-card" class="col-md-8">
                        <div class="d-flex justify-content-around w-100">
                            <div class="card-body d-flex flex-column  w-50">
                                <h2 id="titulo" class="card-title title text-capitalize ">${element.productName}</h2>
                                <p class="card-text paragraph text-capitalize">${element.productDescription}</p>
                                <p class="card-text paragraph ">${element.productPrice} COP</p>
                            </div>
                            <div class="card-body d-flex flex-column  w-50">
                                <h2 id="titulo" class="card-title title text-capitalize ">${element.ownerAgricola.ownerName} ${element.ownerAgricola.ownerLastName}</h2>
                                <p class="card-text paragraph text-capitalize"><i class="bi bi-geo-alt-fill"></i> ${element.ownerAgricola.ownerTown}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end flex-row-reverse w-100 border-0">
                            <div id="logos-card w-50">
                            <ul id="ul-contact-owner pl-0">
                            <a href="mailto:${element.ownerAgricola.ownerEmail}" target="_blank" ><i
                                    class="bi bi-envelope-fill fs-2 color-icon-detail"></i></a>
                            <a href="tel: +${element.ownerAgricola.ownerPhoneNumber}" target="_blank"><i 
                                    class="bi bi-telephone-fill fs-2 color-icon-detail"></i></a>
                                    <a
                                    href="https:wa.me/${element.ownerAgricola.ownerNumberWhatsapp}/?text=Buen día vengo de Carites! Me gustaría saber mas de tus productos "><img
                                        id="wpp-detail-modal" src="../../public/icons/whatsapp.webp" width="30px" height="35px"
                                        border-radius="50px" alt="Icono de whatsapp" class="me-5 mb-3">
                                </a>
                            </ul>
                        </div>
                            
                            <div class="w-50">
                                <button type="button" data-id=${element.id} class="btn btn-danger ms-3">Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
              </article>
        `
    })
}

index()

//Function Delete card
async function deleteItem(id) { 

    await fetch(URL + id, {
        method: "DELETE" 
    })
}


