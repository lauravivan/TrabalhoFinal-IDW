function showHomepageTabloidCatSide() {
    tabloidLeftArrow.innerText = "";
    picturesTabloid.innerHTML = `<img class="img-fluid vw-100" src="assets/img/cat.PNG">`
    picturesTabloid.innerHTML += 
                        `<div class="position-absolute pb-3">
                            <a class="btn border border-dark rounded-pill fs-2 p-3 btn-see-more bolder-font-500 bg-color-lighter page-font text-decoration-none" href="cat.html" id="cats">Veja mais</a>
                        </div>`
    tabloidRightArrow.innerHTML = `<i class="bi bi-caret-right-fill fs-5 cursor-pointer" onclick="showHomepageTabloidDogSide()"></i>`;
}

function showHomepageTabloidDogSide() {
    tabloidRightArrow.innerText = "";
    picturesTabloid.innerHTML = `<img class="img-fluid vw-100" src="assets/img/dog.PNG">`
    picturesTabloid.innerHTML += 
                        `<div class="position-absolute pb-3">
                            <a class="btn border border-dark rounded-pill fs-2 p-3 btn-see-more bolder-font-500 bg-color-lighter page-font text-decoration-none" href="dog.html" id="dogs">Veja mais</a>
                        </div>`
    tabloidLeftArrow.innerHTML = `<i class="bi bi-caret-left-fill fs-5 cursor-pointer" onclick="showHomepageTabloidCatSide()"></i>`
}

function showProducts(products, container) {
    for(let i = 0; i < products.length; i++) {
        container.innerHTML +=
            `<div class="col-md-4 col-lg-3 col-sm-6 col-12">
                <div class="bg-light text-center pt-3 pb-2 product-info cursor-pointer" style="height: 36vw;">
                    <img class="product-image img-fluid" id="image" onclick="goToProductPage(this.src)" src="${products[i].img}">
                    <p class="text-uppercase pt-4 ps-2 pe-2 product-name bolder-font-700 page-font">${products[i].name}</p>
                    <p>R$ ${products[i].price}</p>
                </div>
            </div>`;
    }
}

function goToProductPage(clickedProductImgSource) {
    localStorage.setItem("ClickedProduct", clickedProductImgSource);
    window.open("product.html", "_self");
}

function discoverClickedProduct() {
    let imageSource = localStorage.getItem("ClickedProduct");

    for (let i = 0; i < catProducts.length; i++) {
        if (imageSource.includes(catProducts[i].img)) {
            showClickedProduct(catProducts[i]);
        }
    }

    for (let i = 0; i < dogProducts.length; i++) {
        if (imageSource.includes(dogProducts[i].img)) {
            showClickedProduct(dogProducts[i]);
        }
    }
}

function showClickedProduct(clickedProduct) {
    let imageContainer = document.getElementById("clicked-product-img");
    let nameContainer = document.getElementById("product-title-container");
    let description = document.getElementById("product-description");
    let price = document.getElementById("product-price");

    imageContainer.innerHTML += `<img class="img-fluid border border-dark border-5 w-75" src="${clickedProduct.img}">`;
    nameContainer.innerHTML = `<h2 class="text-uppercase fs-1 bolder-font-700" id="product-title" name="${clickedProduct.name}">${clickedProduct.name}</h2>`;
    description.innerText = `${clickedProduct.description}`;
    price.innerText = `Preço: R$${clickedProduct.price}`
}

function buyProduct() {
    if (parseInt(localStorage.getItem("countage products")) >= 20) {
        document.getElementById("alert").innerHTML = 
        `<div class="alert alert-warning" role="alert"> O seu carrinho já está cheio!</div>`;
    } else {
        let productTitleElement = document.getElementById("product-title").getAttribute("name");
        let quantitySelected = document.getElementById("quantity").value;
        countageProducts++;
        localStorage.setItem("countage products", countageProducts);
        let cartIcon = document.getElementById("cart-icon");
        cartIcon.innerHTML = `<span class="badge rounded-pill bg-dark position-absolute">${countageProducts}</span>`;
        discoverProductToBuy(productTitleElement, quantitySelected);
    }
}

function discoverProductToBuy(productTitleElement, quantitySelected) {
    for (let i = 0; i < catProducts.length; i++) {
        if (productTitleElement == catProducts[i].name) {
            putProductInTheCart(catProducts[i], quantitySelected);
        }
    }

    for (let i = 0; i < dogProducts.length; i++) {
        if (productTitleElement == dogProducts[i].name) {
            putProductInTheCart(dogProducts[i], quantitySelected);
        }
    }
}   


//aqui que começa o problema. Precisa da página de login pra começar a resolver
function putProductInTheCart(product, quantity) {
    let user = JSON.parse(localStorage.getItem('users'))
    user[0].cart.push(
        {
            product: product,
            quantity: quantity
        }
    );
}

function takeProductOutOfCart(id) {
    let products = JSON.parse(localStorage.getItem('selected products'));
    for (let i = 0; i < products.length; i++) {
        if (parseInt(id) == i) {
            delete products[i];
        }
    }
    products = products.filter(function (i) {
        return i;
    })
    localStorage.setItem('selected products', JSON.stringify(products));

    countageProducts--;
    localStorage.setItem("countage products", countageProducts);
    let cartIcon = document.getElementById("cart-icon");
    cartIcon.innerHTML = `<span class="badge rounded-pill bg-dark position-absolute">${countageProducts}</span>`;
    location.reload();
}

function finalizeOrder() {
    if (loggedIn == "true") {
        window.open("payment-deliver-adress.html", "_self");
    } else {
        window.open("login.html", "_self");
    }
}

function userCardChoices() {
    let userChoices = {
        card: document.querySelector('input[name=card]:checked').value,
        cardImg: document.querySelector('input[name=card-img]:checked').value
    };

    localStorage.setItem('chosen card', JSON.stringify(userChoices));
}

function registerUser() {
    let emailAdress = document.getElementById("email-adress").value;
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let cpf = document.getElementById("cpf").value;
    let cellNumber = document.getElementById("cell-number").value;
    let password = document.getElementById("user-password").value;
    let passwordConfirmation = document.getElementById("user-confirmation-password").value;
    let userAlreadyExists = false;
    if (password != passwordConfirmation) {
        document.getElementById("alert").innerHTML = 
        `<div class="alert alert-warning" role="alert">A sua senha está incorreta!</div>`;
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].emailAdress == emailAdress) {
                userAlreadyExists = true;
            }
        }

        if (userAlreadyExists) {
            document.getElementById("alert").innerHTML = 
            `<div class="alert alert-warning" role="alert">Esse usuário já existe! Por favor faça login ou crie uma nova conta!</div>`;
        } else {
            let user = [{
                emailAdress: emailAdress,
                firstName: firstName,
                lastName: lastName,
                cpf: cpf,
                cellNumber: cellNumber,
                password: password,
                cart: [],
                orders: []
            }]
            localStorage.setItem('users', JSON.stringify(user));
            emailAdress = "";
            firstName = "";
            lastName = "";
            cpf = "";
            cellNumber = "";
            password = "";
            passwordConfirmation = "";
        }
    }
}

let dogProducts = [
    {
        name: "Blusa de lã",
        img: "assets/img/dog-products/wool-sweater.jpg",
        description: "",
        price: "99.90"
    },
    {
        name: "Coleira multi-color",
        img: "assets/img/dog-products/dog-collar.jpg",
        description: "",
        price: "99.90"
    },
    {
        name: "Macaco de pelúcia",
        img: "assets/img/dog-products/monkey.jpg",
        description: "",
        price: "76.40"
    },
    {
        name: "Biscoitos",
        img: "assets/img/dog-products/cookies.jpg",
        description: "",
        price: "76.40"
    },
    {
        name: "Cachorro de pelúcia",
        img: "assets/img/dog-products/a-dog-for-a-dog.jpg",
        description: "",
        price: "76.40"
    },
    {
        name: "Bolas de morder coloridas",
        img: "assets/img/dog-products/balls.jpg",
        description: "",
        price: "76.40"
    },
    {
        name: "Óculos John Lennon | Cachorro",
        img: "assets/img/dog-products/glasses.jpg",
        description: "",
        price: "76.40"
    }
]

let catProducts = [
    {
        name: "Coxinha de Catnip",
        img: "assets/img/cat-products/coxinha.jpg",
        description: "Catnip é uma erva natural da família do hortelã que pode tanto aliviar o stress para gatos muito ativos, que vivem arranhando e danificando objetos da casa, como pode servir de estimulante para gatos muito quietinhos. Recheio: 2g de catnip",
        price: "32.90"
    },
    {
        name: "Comedouro alto de madeira | Duplo",
        img: "assets/img/cat-products/cat-feeder.jpg",
        description: "O comedouro é feito à mão, com madeira cedrinho e finalizado com óleo mineral. Acompanham 2 tigelas inox ou cerâmica, super fáceis de lavar e ainda ajudam na prevenção de acne felina.",
        price: "159.90"
    },
    {
        name: "TV Tubo de Papelão",
        img: "assets/img/cat-products/tv.jpg",
        description: "Essa é mais uma forma de enriquecer o ambiente, proporcionando mais atividades e brincadeiras para o seu gato. Além disso, o papelão é um isolante térmico e ajuda a preservar o calor do nosso corpo, proporcionando um sono de beleza tranquilo e quentinho, do jeito que a gente gosta! Vem com furos para você interagir com seu gato, com petiscos ou brinquedos. O papelão é de alta qualidade, com vida útil longa! É simples de montar, não vai cola, apenas dobras.",
        price: "99.90"
    },
    {
        name: "Fantasia estampa de vaca",
        img: "assets/img/cat-products/cow-costume.jpg",
        description: "Essa roupa confortável e fácil de vestir. Tamanhos disponíveis: P (até 3kg), M (de 3 a 4kg) ou G (de 4kg a 7kg).",
        price: "76.40"
    },
    {
        name: "Castelo de papelão",
        img: "assets/img/cat-products/castle.jpg",
        description: "Essa é mais uma forma de enriquecer o ambiente, proporcionando mais atividades e brincadeiras para o seu gato. Além disso, o papelão é um isolante térmico e ajuda a preservar o calor do nosso corpo, proporcionando um sono de beleza tranquilo e quentinho, do jeito que a gente gosta!",
        price: "99.90"
    },
    {
        name: "Sardinhas de Catnip em lata",
        img: "assets/img/cat-products/sardine.jpg",
        description: "A lata vem com 4 sardinhas recheadas com 2g de catnip cada. As sardinhas são de feltro e feitas à mão. A erva você já sabe: tem o selo erva da boa! Cada sardinha tem durabilidade (efeito do catnip) de no mínimo 3 meses. Pode ficar tranquilo, humano: seu gato tem diversão garantida bom um bom tempo.",
        price: "99.90"
    },
    {
        name: "Moletom canguru",
        img: "assets/img/cat-products/sweater.jpg",
        description: "Moletom básico azul-marinho para o dia-a-dia. Tamanhos disponíveis: P (até 3kg), M (de 3 a 4kg) ou G (de 4kg a 7kg).",
        price: "76.40"
    },
    {
        name: "Fantasia de unicórnio",
        img: "assets/img/cat-products/unicorn-costume.jpg",
        description: "O fecho é de velcro, ajustável à cabeça do seu gato. É super leve, fique tranquilo, o chifre não pesa! Tamanho único",
        price: "59.90"
    },
    {
        name: "Óculos John Lennon | Gato",
        img: "assets/img/cat-products/glasses.jpg",
        description: "O fecho é de velcro, ajustável à cabeça do seu gato. É super leve, fique tranquilo, o chifre não pesa! Tamanho único",
        price: "59.90"
    },
    {
        name: "Comedouro raso | Sachê",
        img: "assets/img/cat-products/bowl.jpg",
        description: "",
        price: "76.40"
    },
    {
        name: "Suporte 2 alturas | Para comedouro de porcelana",
        img: "assets/img/cat-products/bowl-and-support.jpg",
        description: "",
        price: "76.40"
    },
    {
        name: "Kit comedouros de porcelana | Ração e água",
        img: "assets/img/cat-products/two-bowls.jpg",
        description: "",
        price: "76.40"
    }
]

let picturesTabloid = document.getElementById("pictures-tabloid")
let tabloidRightArrow = document.getElementById("tabloid-right-arrow");
let tabloidLeftArrow = document.getElementById("tabloid-left-arrow");

let mainOffers = [catProducts[0], catProducts[3], catProducts[6], catProducts[7], dogProducts[0], dogProducts[2], dogProducts[3], dogProducts[4]];

let countageProducts = JSON.parse(localStorage.getItem('countage products'));

let loggedIn = localStorage.getItem('logged in');

let cardChosen = JSON.parse(localStorage.getItem('chosen card')) || [];

let users = JSON.parse(localStorage.getItem('users')) || [];