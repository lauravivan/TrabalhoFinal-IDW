let navText = `<nav class="navbar navbar-expand-sm bg-color-lighter">
                    <div class="container-fluid">
                        <a class="nav-link text-decoration-none text-reset" href="index.html">Página Inicial</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsed-navbar" aria-expanded="false" aria-controls="#collapsed-navbar">
                            <i class="bi bi-list"></i>
                        </button>
                        <div class="collapse navbar-collapse" id="collapsed-navbar">
                            <a class="nav-link text-decoration-none text-reset" href="about.html">Sobre nós</a>
                            <ul class="navbar-nav ms-auto me-md-4 me-lg-4 d-flex align-items-md-center align-items-lg-center">
                                <li class="nav-item dropdown me-1">
                                    <a class="nav-link dropdown-toggle text-decoration-none text-reset" href="#" role="button" id="navbar-dropdown" data-bs-toggle="dropdown" aria-expanded="false">Minha conta</a>
                                    <ul class="dropdown-menu" aria-labelledby="navbar-dropdown">
                                        <li id="user-login"></li>
                                        <li>
                                            <a class="dropdown-item" href="#">Meus pedidos</a>
                                        </li>
                                        <li id="user-logout"></li>
                                    </ul>
                                </li>
                                <li class="nav-item me-4">
                                    <a class="nav-link text-decoration-none text-reset" href="cart.html">
                                        <i class="bi bi-cart-fill position-relative" id="cart-icon"></i>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <span>
                                        <i class="bi bi-search"></i>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>`
document.write(navText);