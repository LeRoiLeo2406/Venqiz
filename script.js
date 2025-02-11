document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM chargé !");

    // Sélection des éléments du DOM
    const cart = document.querySelector("#cart-sidebar");
    const cartOverlay = document.querySelector("#cart-overlay");
    const cartContent = document.querySelector(".cart-content");
    const closeCart = document.querySelector("#close-cart");
    const cartIcon = document.querySelector(".cart img");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // 🎯 Fonction pour afficher le panier
    function displayCart() {
        console.log("🔄 Mise à jour du panier...");

        cartContent.innerHTML = ""; // On vide d'abord le contenu du panier

        if (cartItems.length === 0) {
            console.log("🛒 Le panier est vide.");
            cartContent.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div class="cart-item-container">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <p class="cart-item-title"><strong>${item.name}</strong></p>
                        <p>Size: ${item.size}</p>
                        <p>Price: ${item.price}</p>
                        <div class="cart-item-quantity">
                            <button class="decrease-qty" data-index="${index}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-qty" data-index="${index}">+</button>
                        </div>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;

            cartContent.appendChild(cartItem);
        });

        // 🎯 Gestion des boutons + et -
        document.querySelectorAll(".increase-qty").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.dataset.index;
                cartItems[index].quantity++;
                updateCartStorage();
            });
        });

        document.querySelectorAll(".decrease-qty").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.dataset.index;
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity--;
                } else {
                    cartItems.splice(index, 1); // Supprimer l'article si la quantité est 0
                }
                updateCartStorage();
            });
        });

        // 🎯 Supprimer un produit du panier
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.dataset.index;
                cartItems.splice(index, 1);
                updateCartStorage();
            });
        });
    }

    // 🎯 Ajouter un produit au panier
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            console.log("🛒 Ajout d'un produit au panier...");

            const productContainer = this.closest(".product-info");
            if (!productContainer) {
                console.error("❌ ERREUR: Produit introuvable !");
                return;
            }

            const productName = productContainer.querySelector(".product-title").innerText;
            const productPrice = productContainer.querySelector(".product-price").innerText;
            const productSize = productContainer.querySelector("#size").value;
            const productImage = document.querySelector(".product-image-container img").src; // Prend la première image du produit

            // Vérifier si le produit est déjà dans le panier
            const existingProduct = cartItems.find(item => item.name === productName && item.size === productSize);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cartItems.push({
                    name: productName,
                    price: productPrice,
                    size: productSize,
                    image: productImage,
                    quantity: 1
                });
            }

            updateCartStorage();
            openCart(); // Afficher le panier après ajout
        });
    });

    // 🎯 Fonction pour sauvegarder et mettre à jour l'affichage du panier
    function updateCartStorage() {
        localStorage.setItem("cart", JSON.stringify(cartItems));
        displayCart();
    }

    // 🎯 Ouvrir le panier
    function openCart() {
        console.log("🛒 Ouverture du panier...");
        cart.classList.add("active");
        cartOverlay.classList.add("active");
    }

    // 🎯 Fermer le panier
    function closeCartFunc() {
        console.log("🛒 Fermeture du panier...");
        cart.classList.remove("active");
        cartOverlay.classList.remove("active");
    }

    // 🎯 Écouteurs pour ouverture et fermeture du panier
    cartIcon.addEventListener("click", openCart);
    closeCart.addEventListener("click", closeCartFunc);
    cartOverlay.addEventListener("click", closeCartFunc);

    // 🎯 Initialisation du panier au chargement
    displayCart();
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle img");
    const sideMenu = document.getElementById("side-menu");
    const closeMenu = document.getElementById("close-menu");
    const menuOverlay = document.getElementById("menu-overlay");

    // Ouvrir le menu
    menuToggle.addEventListener("click", function () {
        sideMenu.classList.add("active");
        menuOverlay.classList.add("active");
    });

    // Fermer le menu avec la croix
    closeMenu.addEventListener("click", function () {
        sideMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
    });

    // Fermer le menu en cliquant à l'extérieur
    menuOverlay.addEventListener("click", function () {
        sideMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
    });
});
