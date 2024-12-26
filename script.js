// Afficher le formulaire de connexion et masquer l'inscription
function showLoginForm() {
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('registerSection').classList.add('hidden');
}

// Afficher le formulaire d'inscription et masquer la connexion
function showRegisterForm() {
    document.getElementById('registerSection').classList.remove('hidden');
    document.getElementById('loginSection').classList.add('hidden');
}

// Fonction de connexion
function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Si l'utilisateur est "admin"
    if (username === "admin" && password === "admin") {
        alert("Bienvenue Admin !");
        document.getElementById('adminSection').classList.remove('hidden');
        document.getElementById('mainContent').classList.add('hidden');
    } else {
        // Vérifier si l'utilisateur existe dans localStorage
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(u => u.email === username && u.password === password);

        if (user) {
            alert("Connexion réussie !");
            document.getElementById('productsSection').classList.remove('hidden');
            document.getElementById('mainContent').classList.add('hidden');
        } else {
            alert("Identifiants incorrects.");
        }
    }
}

// Inscrire un nouvel utilisateur
function registerUser() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    showLoginForm();
}

// Fonction d'ajout de produit (accessible uniquement par l'admin)
function addProduct() {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];

    if (productName && productPrice && productImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newProduct = {
                name: productName,
                price: productPrice,
                image: e.target.result
            };

            let products = JSON.parse(localStorage.getItem("products")) || [];
            products.push(newProduct);
            localStorage.setItem("products", JSON.stringify(products));

            alert("Produit ajouté !");
            displayProducts();
        };
        reader.readAsDataURL(productImage);
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

// Afficher les produits dans la boutique
function displayProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    const productList = document.getElementById('productList');
    productList.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}€</p>
        `;
        productList.appendChild(productDiv);
    });
}

// Déconnexion de l'admin ou utilisateur
function logout() {
    document.getElementById('adminSection').classList.add('hidden');
    document.getElementById('productsSection').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    alert("Déconnexion réussie !");
}

// Charger les produits au démarrage de la page
document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
});