function userLogin() {
    if (loggedUser.length > 0) {
        document.getElementById("user-login").innerHTML = `<span class="dropdown-item bolder-font-700">Olá ${localStorage.getItem('LoggedUser')}</span>`;
        document.getElementById("user-logout").innerHTML = `<span class="dropdown-item cursor-pointer" onclick="userLogout()">Sair</span>`;
    } else {
        document.getElementById("user-login").innerHTML = `<a class="dropdown-item" href="login.html">Fazer login</a>`;
    }
}

function cartCount() {
    if (cartProductsCount > 0) {
        let cartIcon = document.getElementById("cart-icon");
        cartIcon.innerHTML = `<span class="badge rounded-pill bg-dark position-absolute">${cartProductsCount}</span>`;
    }
}

function showProducts(products, container) {
    for(let i = 0; i < products.length; i++) {
        container.innerHTML +=
            `<div class="col-md-4 col-lg-3 col-sm-6 col-12">
                <div class="bg-light text-center pt-3 pb-2 opacity cursor-pointer container-fluid">
                    <img class="img-fluid" id="image" onclick="goToProductPage(this.src)" src="${products[i].img}">
                    <p class="text-uppercase m-2 product-name bolder-font-700 page-font">${products[i].name}</p>
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
    let titleContainer = document.getElementById("clicked-product-title");
    let descriptionContainer = document.getElementById("clicked-product-description");
    let priceContainer = document.getElementById("clicked-product-price");

    imageContainer.innerHTML += `<img class="img-fluid border border-dark border-5" src="${clickedProduct.img}">`;
    titleContainer.innerHTML = `<h2 class="text-uppercase display-6 bolder-font-700" id="product-title" name="${clickedProduct.name}">${clickedProduct.name}</h2>`;
    descriptionContainer.innerHTML = `<p class="h3 bolder-font-500">${clickedProduct.description}</p>`;
    priceContainer.innerHTML = `<p class="h3 bolder-font-700">Preço: R$${clickedProduct.price}</p>`
}

function buyProduct() {
    if (JSON.parse(localStorage.getItem('CartProductsCount')) >= 20) {
        document.getElementById("alert").innerHTML = 
        `<div class="alert alert-warning" role="alert"> O seu carrinho já está cheio!</div>`;
    } else {
        let productTitleElement = document.getElementById("product-title").getAttribute("name");
        let quantitySelected = document.getElementById("quantity").value;
        cartProductsCount++;
        localStorage.setItem('CartProductsCount', JSON.stringify(cartProductsCount));
        cartCount();
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

function putProductInTheCart(product, quantity) {
    cartProducts.push(
        {
            product: product,
            quantity: quantity
        }
    );
    localStorage.setItem('CartProducts', JSON.stringify(cartProducts));
}

function takeProductOutOfCart(id) {
    for (let i = 0; i < cartProducts.length; i++) {
        if (i == id) {
            delete cartProducts[i];
        }
    }
    cartProducts = cartProducts.filter(function (i) {
        return i;
    })
    localStorage.setItem('CartProducts', JSON.stringify(cartProducts));

    cartProductsCount--;
    localStorage.setItem('CartProductsCount', JSON.stringify(cartProductsCount));
    cartCount();
    location.reload();
}

function finalizeOrder() {
    if (loggedUser.length > 0) {
        window.open("payment-deliver-adress.html", "_self");
    } else {
        window.open("login.html", "_self");
    }
}

function registerUser() {
    let emailAdress = document.getElementById("email-adress").value;
    let firstName = document.getElementById("first-name").value;
    let password = document.getElementById("user-password").value;
    let passwordConfirmation = document.getElementById("user-confirmation-password").value;
    let alertContainer = document.getElementById("alert");
    let userAlreadyExists = false;
    if (password != passwordConfirmation) {
        alertContainer.innerHTML = 
        `<div class="alert alert-warning" role="alert">A sua senha está incorreta!</div>`;
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].emailAdress == emailAdress) {
                userAlreadyExists = true;
            }
        }

        if (userAlreadyExists) {
            alertContainer.innerHTML = 
            `<div class="alert alert-warning" role="alert">Esse usuário já existe! Por favor faça login ou crie uma nova conta!</div>`;
        } else {
            users.push({
                emailAdress: emailAdress,
                firstName: firstName,
                password: password,
                deliverAdress: [],
                creditCard: [],
                debitCard: [],
                orders: []
            });
            localStorage.setItem('Users', JSON.stringify(users));
            alertContainer.innerHTML = 
            `<div class="alert alert-warning" role="alert">Cadastro feito com sucesso!</div>`;
            document.getElementById("email-adress").value = "";
            document.getElementById("first-name").value = "";
            document.getElementById("user-password").value = "";
            document.getElementById("user-confirmation-password").value = "";

            setTimeout(function() {
                window.open("index.html", "_self");
            }, 1000);
        }
    }
}

function login() {
    let emailAdress = document.getElementById("email-adress").value;
    let userPassword = document.getElementById("user-password").value;
    let alertDiv = document.getElementById("alert");
    alertDiv.innerText = "";
    let userDoesntExist = true;

    for (let i = 0; i < users.length; i++) {
        if (users[i].emailAdress == emailAdress && (users[i].password == userPassword)) {
            localStorage.setItem("LoggedUser", users[i].firstName)
            userDoesntExist = false;
            setTimeout(function() {
                window.open("index.html", "_self");
            }, 2000);
        }
    }
    if (userDoesntExist) {
        alertDiv.innerHTML = `<div class="alert alert-warning" role="alert">O seu e-mail ou a sua senha estão incorretos!</div>`;
    }
}

function userLogout() {
    document.getElementById("user-login").innerHTML = `<a class="dropdown-item" href="login.html">Fazer login</a>`;

    document.getElementById("user-logout").innerText = "";
    localStorage.setItem('LoggedUser', "");
}

function addDeliverAdress() {
    let streetAdress = document.getElementById("street").value;
    let homeNumber = document.getElementById("home-number").value;
    let complement = document.getElementById("complement").value;
    let district = document.getElementById("district").value;
    let cep = document.getElementById("cep").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;

    if(streetAdress.length > 0 && (homeNumber.length > 0) && (district.length > 0)
                && (cep.length > 0) && (city.length > 0) && (state.length > 0)) {
        for (let i = 0; i < users.length; i++) {
            if (loggedUser == users[i].firstName) {
                users[i].deliverAdress.push({
                    streetAdress: streetAdress,
                    homeNumber: homeNumber,
                    complement: complement,
                    district: district,
                    cep: cep,
                    city: city,
                    state: state
                })

                localStorage.setItem('Users', JSON.stringify(users));
            }
        }
    }
}

function userCardChoices() {
    chosenCard.push({
        card: document.querySelector('input[name=card]:checked').value,
        cardImg: document.querySelector('input[name=card-img]:checked').value
    });

    localStorage.setItem('ChosenCard', JSON.stringify(chosenCard));
}

function addCardInformation() {
    let cardName = document.getElementById("card-name").value;
    let cardNumber = document.getElementById("card-number").value;
    let cardCode = document.getElementById("card-code").value;
    let expireCardDate = document.getElementById("expire-card-date").value;

    if(cardName.length > 0 && (cardNumber.length > 0) && (cardCode.length > 0)
                && (expireCardDate.length > 0)) {
        for (let i = 0; i < users.length; i++) {
            if (loggedUser == users[i].firstName) {
                if (chosenCard.card == "credit card") {
                    users[i].creditCard.push({
                        cardName: cardName,
                        cardNumber: cardNumber,
                        cardCode: cardCode,
                        expireCardDate: expireCardDate
                    })
                } else {
                    users[i].debitCard.push({
                        cardName: cardName,
                        cardNumber: cardNumber,
                        cardCode: cardCode,
                        expireCardDate: expireCardDate
                    })
                }

                localStorage.setItem('Users', JSON.stringify(users));
            }
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

let mainOffers = [catProducts[0], catProducts[3], catProducts[6], catProducts[7], dogProducts[0], dogProducts[2], dogProducts[3], dogProducts[4]];

let cartProductsCount = JSON.parse(localStorage.getItem('CartProductsCount')) || 0;

let chosenCard = JSON.parse(localStorage.getItem('ChosenCard')) || [];

let users = JSON.parse(localStorage.getItem('Users')) || [];

let cartProducts = JSON.parse(localStorage.getItem('CartProducts')) || [];

let loggedUser = localStorage.getItem('LoggedUser') || "";