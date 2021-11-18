function buildHTMLProducts(products, productsContainer) {
    for(let i = 0; i < products.length; i++) {
        productsContainer.innerHTML +=
            `<div class="col-md-4 col-lg-3 col-sm-6 col-12">
                <div class="bg-light text-center pt-3 pb-2 product-info">
                    <img class="product-image img-fluid" id="image" onclick="goToProductPage(this.src)" src="${products[i].img}">
                    <p class="text-uppercase pt-4 product-name">${products[i].name}</p>
                    <p>R$ ${products[i].price}</p>
                </div>
            </div>`;
    }
}

function goToProductPage(imageSource) {
    localStorage.setItem("image source", imageSource);
    window.open("product.html", "_self");
}

function discoverSelectedProduct() {
    if (localStorage.getItem("image source").includes("coxinha")) {
        showDetailedProduct(catProducts[0]);
    } else if (localStorage.getItem("image source").includes("cat-feeder")) {
        showDetailedProduct(catProducts[1]);
    } else if (localStorage.getItem("image source").includes("tv")) {
        showDetailedProduct(catProducts[2]);
    } else if (localStorage.getItem("image source").includes("cow-costume")) {
        showDetailedProduct(catProducts[3]);
    } else if (localStorage.getItem("image source").includes("castle")) {
        showDetailedProduct(catProducts[4]);
    } else if (localStorage.getItem("image source").includes("sardine")) {
        showDetailedProduct(catProducts[5]);
    } else if (localStorage.getItem("image source").includes("sweater")) {
        showDetailedProduct(catProducts[6]);
    } else if (localStorage.getItem("image source").includes("unicorn-costume")) {
        showDetailedProduct(catProducts[7]);
    } else if (localStorage.getItem("image source").includes("wool-sweater")) {
        showDetailedProduct(dogProducts[0]);
    } else if (localStorage.getItem("image source").includes("dog-collar")) {
        showDetailedProduct(dogProducts[1]);
    } else if (localStorage.getItem("image source").includes("monkey")) {
        showDetailedProduct(dogProducts[2]);
    }
}

function showDetailedProduct(list) {
    let imageContainer = document.getElementById("detail-image-container");
    let name = document.getElementById("product-title");
    let description = document.getElementById("product-description");
    let price = document.getElementById("product-price");

    imageContainer.innerHTML += `<img class="img-fluid detail-image m-3" src="${list.img}">`;
    name.innerText = `${list.name}`;
    description.innerText = `${list.description}`;
    price.innerText = `Preço: R$${list.price}`
}

function showMainOffers() {
    let containerMainOffers = document.getElementById("main-offers");
    let mainOffers = [catProducts[0], catProducts[3], catProducts[6], catProducts[7], dogProducts[0], dogProducts[1], dogProducts[2]];
    for(let i = 0; i < mainOffers.length; i++) {
        containerMainOffers.innerHTML +=
            `<div class="col-md-4 col-lg-3 col-sm-6 col-12">
                <div class="bg-light text-center pt-3 pb-2 product-info">
                    <img class="product-image img-fluid" id="image" onclick="goToProductPage(this.src)" src="${mainOffers[i].img}">
                    <p class="text-uppercase pt-4 product-name">${mainOffers[i].name}</p>
                    <p>R$ ${mainOffers[i].price}</p>
                </div>
            </div>`;
    }
}

function showCatPicture() {
    let container = document.getElementById("container-pictures-homepage")
    let containerArrowRight = document.getElementById("container-arrow-right");
    let containerArrowLeft = document.getElementById("container-arrow-left");

    containerArrowLeft.innerText = "";
    container.innerHTML = `<img class="img-fluid vw-100" src="assets/img/cat.jpg">`
    container.innerHTML += 
                        `<div class="position-absolute pb-5">
                            <button class="border border-dark rounded-pill fs-2 p-3 btn-see-more" onclick="showCatProducts()" id="cats">Veja mais</button>
                        </div>`
    containerArrowRight.innerHTML = `<i class="bi bi-caret-right-fill fs-5" onclick="showDogPicture()" style="cursor: pointer;"></i>`;
}

function showDogPicture() {
    let container = document.getElementById("container-pictures-homepage");
    let containerArrowRight = document.getElementById("container-arrow-right");
    let containerArrowLeft = document.getElementById("container-arrow-left");

    containerArrowRight.innerText = "";
    container.innerHTML = `<img class="img-fluid vw-100" src="assets/img/dog.jpg">`
    container.innerHTML += 
                        `<div class="position-absolute pb-5">
                            <button class="border border-dark rounded-pill fs-2 p-3 btn-see-more" onclick="showDogProducts()" id="dogs">Veja mais</button>
                        </div>`
    containerArrowLeft.innerHTML = `<i class="bi bi-caret-left-fill fs-5" onclick="showCatPicture()" 
    style="cursor: pointer;"></i>`;
}

function showCatProducts() {
    window.open("cat.html", "_self");
}

function showDogProducts() {
    window.open("dog.html", "_self");
}

let dogProducts = [
    {
        name: "Blusa de lã",
        img: "assets/img/dog-products/wool-sweater.jpg",
        description: "",
        price: "99,90"
    },
    {
        name: "Coleira multi-color",
        img: "assets/img/dog-products/dog-collar.jpg",
        description: "",
        price: "99,90"
    },
    {
        name: "Alce de pelúcia",
        img: "assets/img/dog-products/monkey.jpg",
        description: "",
        price: "76,40"
    }
]

let catProducts = [
    {
        name: "Coxinha de Catnip",
        img: "assets/img/cat-products/coxinha.jpg",
        description: "Catnip é uma erva natural da família do hortelã que pode tanto aliviar o stress para gatos muito ativos, que vivem arranhando e danificando objetos da casa, como pode servir de estimulante para gatos muito quietinhos. Recheio: 2g de catnip",
        price: "32,90"
    },
    {
        name: "Comedouro alto de madeira | duplo",
        img: "assets/img/cat-products/cat-feeder.jpg",
        description: "O comedouro é feito à mão, com madeira cedrinho e finalizado com óleo mineral. Acompanham 2 tigelas inox ou cerâmica, super fáceis de lavar e ainda ajudam na prevenção de acne felina.",
        price: "159,90"
    },
    {
        name: "TV Tubo de Papelão",
        img: "assets/img/cat-products/tv.jpg",
        description: "Essa é mais uma forma de enriquecer o ambiente, proporcionando mais atividades e brincadeiras para o seu gato. Além disso, o papelão é um isolante térmico e ajuda a preservar o calor do nosso corpo, proporcionando um sono de beleza tranquilo e quentinho, do jeito que a gente gosta! Vem com furos para você interagir com seu gato, com petiscos ou brinquedos. O papelão é de alta qualidade, com vida útil longa! É simples de montar, não vai cola, apenas dobras.",
        price: "99,90"
    },
    {
        name: "Fantasia estampa de vaca",
        img: "assets/img/cat-products/cow-costume.jpg",
        description: "Essa roupa confortável e fácil de vestir. Tamanhos disponíveis: P (até 3kg), M (de 3 a 4kg) ou G (de 4kg a 7kg).",
        price: "76,40"
    },
    {
        name: "Castelo de papelão",
        img: "assets/img/cat-products/castle.jpg",
        description: "Essa é mais uma forma de enriquecer o ambiente, proporcionando mais atividades e brincadeiras para o seu gato. Além disso, o papelão é um isolante térmico e ajuda a preservar o calor do nosso corpo, proporcionando um sono de beleza tranquilo e quentinho, do jeito que a gente gosta!",
        price: "99,90"
    },
    {
        name: "Sardinhas de Catnip em lata",
        img: "assets/img/cat-products/sardine.jpg",
        description: "A lata vem com 4 sardinhas recheadas com 2g de catnip cada. As sardinhas são de feltro e feitas à mão. A erva você já sabe: tem o selo erva da boa! Cada sardinha tem durabilidade (efeito do catnip) de no mínimo 3 meses. Pode ficar tranquilo, humano: seu gato tem diversão garantida bom um bom tempo.",
        price: "99,90"
    },
    {
        name: "Moletom canguru",
        img: "assets/img/cat-products/sweater.jpg",
        description: "Moletom básico azul-marinho para o dia-a-dia. Tamanhos disponíveis: P (até 3kg), M (de 3 a 4kg) ou G (de 4kg a 7kg).",
        price: "76,40"
    },
    {
        name: "Fantasia de unicórnio",
        img: "assets/img/cat-products/unicorn-costume.jpg",
        description: "O fecho é de velcro, ajustável à cabeça do seu gato. É super leve, fique tranquilo, o chifre não pesa! Tamanho único",
        price: "59,90"
    }
]