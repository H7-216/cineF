function convertFile() {
    const fileInput = document.getElementById('fileInput');
    const status = document.getElementById('status');

    if (fileInput.files.length === 0) {
        status.textContent = 'Veuillez sélectionner un fichier.';
        status.style.color = 'red';
    } else {
        // Simuler la conversion
        status.textContent = 'Conversion en cours...';
        status.style.color = 'green';

        // Vous pouvez implémenter un convertisseur réel ici
        setTimeout(() => {
            status.textContent = 'Fichier converti avec succès !';
        }, 2000);
    }
}