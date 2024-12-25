document.getElementById("converter-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("file-input");
    const conversionType = document.getElementById("conversion-type").value;
    const outputMessage = document.getElementById("output-message");

    if (!fileInput.files[0]) {
        outputMessage.textContent = "Veuillez sélectionner un fichier ZIP.";
        outputMessage.style.color = "red";
        return;
    }

    const file = fileInput.files[0];
    const fileName = file.name.replace(".zip", `.${conversionType}`);

    // Lire le fichier ZIP en tant que Blob
    const reader = new FileReader();
    reader.onload = function () {
        const blob = new Blob([reader.result], { type: "application/octet-stream" });

        // Créer un lien de téléchargement
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;

        // Ajouter le lien temporairement au DOM et le déclencher
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Afficher un message de succès
        outputMessage.textContent = `Le fichier a été converti avec succès en ${fileName}.`;
        outputMessage.style.color = "green";
    };

    // Lire le fichier en tant que ArrayBuffer
    reader.readAsArrayBuffer(file);
});