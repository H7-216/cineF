// Utilisation de localStorage pour simuler la gestion des utilisateurs et des produits

// Afficher ou masquer le formulaire de connexion
function showLoginForm() {
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('registerSection').classList.add('hidden');
}

// Afficher ou masquer le formulaire d'inscription
function showRegisterForm() {
    document.getElementById('registerSection').classList.remove('hidden');
    document.getElementById('loginSection').classList.add('hidden');
}

// Fonction de connexion
function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username === "admin" && password === "admin") {
        alert("Bienvenue Admin !");
        document.getElementById('adminSection').classList.remove('hidden');
        document.getElementById('mainContent').classList.add('hidden');
    } else {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(u => u.email === username && u.password === password);

        if (user) {
            alert("Connexion réussie !");
            document.getElementById('mainContent').classList.remove('hidden');
            document.getElementById('loginSection').classList.add('hidden');
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
    hideRegisterForm();
}

// Masquer le formulaire d'inscription
function hideRegisterForm() {
    document.getElementById('registerSection').classList.add('hidden');
}

// Masquer le formulaire de connexion
function hideLoginForm() {
    document.getElementById('loginSection').classList.add('hidden');
}

// Fonction d'ajout de produit (accessible seulement à l'admin)
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

// Déconnexion de l'admin
function logout() {
    document.getElementById('adminSection').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    alert("Déconnexion réussie !");
}

document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
});