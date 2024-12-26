// Fonction pour afficher les détails du fichier
function handleFile() {
    const fileInput = document.getElementById('fileInput');
    const fileDetails = document.getElementById('fileDetails');
    const fileName = fileInput.files[0] ? fileInput.files[0].name : "Aucun fichier choisi";

    fileDetails.innerHTML = `<p>Fichier sélectionné : ${fileName}</p>`;
}

// Fonction de conversion
function convertFile() {
    const fileInput = document.getElementById('fileInput');
    const convertType = document.getElementById('convertType');
    const status = document.getElementById('status');
    
    // Vérifier qu'un fichier a bien été sélectionné
    if (fileInput.files.length === 0) {
        status.textContent = 'Veuillez sélectionner un fichier.';
        status.style.color = 'red';
        return;
    }

    const file = fileInput.files[0];
    const selectedFormat = convertType.value;
    
    // Afficher un message de conversion en cours
    status.textContent = `Conversion en ${selectedFormat} en cours...`;
    status.style.color = 'green';
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const image = new Image();
        image.src = event.target.result;

        image.onload = function() {
            // Créer un canvas pour la conversion de l'image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;

            // Dessiner l'image dans le canvas
            ctx.drawImage(image, 0, 0);

            // Convertir l'image dans le format sélectionné (PNG ou JPEG)
            const convertedDataUrl = canvas.toDataURL(`image/${selectedFormat}`);

            // Créer un lien pour télécharger l'image convertie
            const link = document.createElement('a');
            link.href = convertedDataUrl;
            link.download = `converted.${selectedFormat}`;
            link.click();

            // Afficher un message de succès
            status.textContent = `Fichier converti avec succès en ${selectedFormat}!`;
        };
    };
    
    reader.readAsDataURL(file); // Lire le fichier comme une URL de données
}