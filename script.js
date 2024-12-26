// Fonction pour afficher une page spécifique
function showPage(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.add('hidden')); // Masque toutes les pages
    document.getElementById(page).classList.remove('hidden'); // Affiche la page demandée

    // Met à jour les liens de navigation
    document.getElementById('homeLink').classList.add('hidden');
    document.getElementById('shopLink').classList.add('hidden');
    document.getElementById('logoutLink').classList.add('hidden');

    if (page === 'home') {
        document.getElementById('homeLink').classList.remove('hidden');
    } else if (page === 'shop') {
        document.getElementById('shopLink').classList.remove('hidden');
        document.getElementById('logoutLink').classList.remove('hidden');
    }
}

// Fonction de connexion
function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (username === "admin" && password === "admin") {
        alert("Bienvenue Admin !");
        showPage('admin');
    } else {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(u => u.email === username && u.password === password);

        if (user) {
            alert("Connexion réussie !");
            showPage('shop');
            displayProducts();
        } else {
            alert("Identifiants incorrects.");
        }
    }
}

// Fonction d'inscription
function registerUser() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Inscription réussie !");
    showPage('login');
}

// Fonction d'ajout de produit à la boutique
function addProductToStore() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').files[0];

    if (name && price && image) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newProduct = { name, price, image: e.target.result };
            let products = JSON.parse(localStorage.getItem("products")) || [];
            products.push(newProduct);
            localStorage.setItem("products", JSON.stringify(products));

            alert("Produit ajouté avec succès !");
            displayProducts();
        };
        reader.readAsDataURL(image);
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

// Afficher les produits de la boutique
function displayProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
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

// Déconnexion
function logout() {
    showPage('home');
}