function convertFile() {
    const fileInput = document.getElementById('fileInput');
    const convertType = document.getElementById('convertType');
    const status = document.getElementById('status');

    if (fileInput.files.length === 0) {
        status.textContent = 'Veuillez sélectionner un fichier.';
        status.style.color = 'red';
    } else {
        const selectedFormat = convertType.value;
        
        // Afficher un message de "conversion en cours"
        status.textContent = `Conversion en ${selectedFormat} en cours...`;
        status.style.color = 'green';

        // Simuler une conversion
        setTimeout(() => {
            status.textContent = `Fichier converti avec succès en ${selectedFormat}!`;
        }, 3000); // Simuler un délai de conversion de 3 secondes
    }
}