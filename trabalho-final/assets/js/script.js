function userLogin() {
    if (loggedUser.length > 0) {
        document.getElementById("user-login").innerHTML = `<span class="dropdown-item bolder-font-700">Olá ${localStorage.getItem('LoggedUser')}</span>`;
        document.getElementById("user-logout").innerHTML = `<span class="dropdown-item cursor-pointer" onclick="userLogout()">Sair <i class="bi bi-box-arrow-in-right"></i></span>`;
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
                <div class="opacity text-center cursor-pointer container-fluid">
                    <img class="img-fluid" onclick="goToProductPage(this.src)" src="${products[i].img}">
                    <p class="text-uppercase product-name mt-2 bolder-font-700 page-font">${products[i].name}</p>
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
    let divAlert = document.getElementById("alert");
    if (JSON.parse(localStorage.getItem('CartProductsCount')) >= 20) {
        divAlert.innerHTML = 
        `<div class="alert alert-warning" role="alert"> O seu carrinho já está cheio!</div>`;
    } else {
        let productTitleElement = document.getElementById("product-title").getAttribute("name");
        let quantitySelected = document.getElementById("quantity").value;
        divAlert.innerHTML = `<div class="alert alert-warning" role="alert">Este item foi adicionado ao seu carrinho!</div>`
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
            }, 1000);
        }
    }
    if (userDoesntExist) {
        alertDiv.innerHTML = `<div class="alert alert-warning" role="alert">O seu e-mail ou a sua senha estão incorretos!</div>`;
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

function recoverPassword() {
    let userEmailAdress = document.getElementById("email-adress").value;
    let password = document.getElementById("user-password").value;
    let passwordConfirmation = document.getElementById("user-password-confirmation").value;
    let alertDiv = document.getElementById("alert");
    alertDiv.innerText = "";
    if (password == passwordConfirmation) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].emailAdress == userEmailAdress) {
                users[i].password = passwordConfirmation;
            }
        }

        localStorage.setItem('Users', JSON.stringify(users));
        alertDiv.innerHTML = `<div class="alert alert-warning" role="alert">Senha cadastrada com sucesso!</div>`

        setTimeout(function() {
            window.open("login.html", "_self");
        }, 1000);
    } else {
        alertDiv.innerHTML = `<div class="alert alert-warning" role="alert">A sua senha está incorreta!</div>`;
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
        deliverAdress = {
            streetAdress: streetAdress,
            homeNumber: homeNumber,
            complement: complement,
            district: district,
            cep: cep,
            city: city,
            state: state
        }

        localStorage.setItem('DeliverAdress', JSON.stringify(deliverAdress));
        window.open("payment-form.html", "_self");
    }
}

function userCardChoices() {
    chosenCard = {
        card: document.querySelector('input[name=card]:checked').value,
        cardImg: document.querySelector('input[name=card-img]:checked').value
    };

    localStorage.setItem('ChosenCard', JSON.stringify(chosenCard));

    window.open("payment-form-info.html", "_self");
}

function addCardInformation() {
    let cardName = document.getElementById("card-name").value;
    let cardNumber = document.getElementById("card-number").value;
    let cardCode = document.getElementById("card-code").value;
    let expireCardDate = document.getElementById("expire-card-date").value;

    if(cardName.length > 0 && (cardNumber.length > 0) && (cardCode.length > 0)
                && (expireCardDate.length > 0)) {
        if (chosenCard.card == "credit card") {
            let parcelsSelect = document.getElementById("parcels-sel");
            parcels = parcelsSelect.options[parcelsSelect.selectedIndex].value;
            localStorage.setItem('Parcels', parcels);

            creditCard = {
                cardName: cardName,
                cardNumber: cardNumber,
                cardCode: cardCode,
                expireCardDate: expireCardDate
            }
            localStorage.setItem('CreditCard', JSON.stringify(creditCard));
        } else {
            debitCard = {
                cardName: cardName,
                cardNumber: cardNumber,
                cardCode: cardCode,
                expireCardDate: expireCardDate
            }
            localStorage.setItem('DebitCard', JSON.stringify(debitCard));
        }
        window.open("order-confirmation.html", "_self");
    }
}

function finalizeOrderFinal() {
    for (let i = 0; i < users.length; i++) {
        if (users[i].firstName == loggedUser) {
            users[i].orders.push({
                itens: cartProducts,
                total: total,
                parcels: parcels,
                deliverAdress: deliverAdress,
                creditCard: creditCard,
                debitCard: debitCard
            })
        }
    }
    localStorage.setItem('Users', JSON.stringify(users));
    localStorage.removeItem('CartProducts');
    localStorage.removeItem('CartProductsCount');
    localStorage.removeItem('Parcels');

    setTimeout(function() {
        window.open("message.html", "_self");
    }, 1000);
}

function clickedOrder(id) {
    localStorage.setItem('ClickedOrderId', JSON.stringify(id));
}

function cancelOrder(id) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].firstName == loggedUser) {
            for (let y = 0; y < users[i].orders.length; y++) {
                if (y == id) {
                    delete users[i].orders[y];
                }
            }

            users[i].orders = users[i].orders.filter(function (i) {
                return i;
            })
            localStorage.setItem('Users', JSON.stringify(users));
        }
    }
    location.reload();
}

let dogProducts = [
    {
        name: "Blusa de lã",
        img: "assets/img/dog-products/wool-sweater.png",
        description: "",
        price: "59.90"
    },
    {
        name: "Coleira multi-color",
        img: "assets/img/dog-products/dog-collar.png",
        description: "",
        price: "59.90"
    },
    {
        name: "Macaco de pelúcia",
        img: "assets/img/dog-products/monkey.png",
        description: "",
        price: "76.40"
    },
    {
        name: "Biscoitos",
        img: "assets/img/dog-products/cookies.png",
        description: "",
        price: "99.90"
    },
    {
        name: "Cachorro de pelúcia",
        img: "assets/img/dog-products/a-dog-for-a-dog.png",
        description: "",
        price: "76.40"
    },
    {
        name: "Bolas de morder coloridas",
        img: "assets/img/dog-products/balls.png",
        description: "",
        price: "99.90"
    },
    {
        name: "Óculos John Lennon | Cachorro",
        img: "assets/img/dog-products/glasses.png",
        description: "",
        price: "76.40"
    },
    {
        name: "Cama com estampa de melancia",
        img: "assets/img/dog-products/watermelon.png",
        description: "",
        price: "99.90"
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
        img: "assets/img/cat-products/glasses.png",
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

let total = JSON.parse(localStorage.getItem('Total')) || 0;

let parcels = localStorage.getItem('Parcels') || "";

let clickedOrderId = JSON.parse(localStorage.getItem('ClickedOrderId')) || 0;

let deliverAdress = JSON.parse(localStorage.getItem('DeliverAdress')) || {};

let creditCard = JSON.parse(localStorage.getItem('CreditCard')) || {};

let debitCard = JSON.parse(localStorage.getItem('DebitCard')) || {};