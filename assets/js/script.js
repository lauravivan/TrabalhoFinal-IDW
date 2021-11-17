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

    imageContainer.innerHTML += `<img class="detail-image m-3" src="${list.img}">`;
    name.innerText = `${list.name}`;
    description.innerText = `${list.description}`;
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
        description: "Catnip é uma erva natural da família do hortelã que pode tanto aliviar o stress para gatos muito ativos, que vivem arranhando e danificando objetos da casa, como pode servir de estimulante para gatos muito quietinhos. Recheio: - 2g de catnip",
        price: "32,90"
    },
    {
        name: "Comedouro alto de madeira | duplo",
        img: "assets/img/cat-products/cat-feeder.jpg",
        description: "",
        price: "159,90"
    },
    {
        name: "TV Tubo de Papelão",
        img: "assets/img/cat-products/tv.jpg",
        description: "",
        price: "99,90"
    },
    {
        name: "Fantasia estampa de vaca",
        img: "assets/img/cat-products/cow-costume.jpg",
        description: "",
        price: "76,40"
    },
    {
        name: "Castelo de papelão",
        img: "assets/img/cat-products/castle.jpg",
        description: "",
        price: "99,90"
    },
    {
        name: "Sardinhas de Catnip em lata",
        img: "assets/img/cat-products/sardine.jpg",
        description: "",
        price: "99,90"
    },
    {
        name: "Moletom canguru",
        img: "assets/img/cat-products/sweater.jpg",
        description: "",
        price: "76,40"
    },
    {
        name: "Fantasia de unicórnio",
        img: "assets/img/cat-products/unicorn-costume.jpg",
        description: "",
        price: "59,90"
    }
]