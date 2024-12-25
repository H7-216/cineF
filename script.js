document.getElementById("converter-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("file-input");
    const outputMessage = document.getElementById("output-message");

    if (!fileInput.files[0]) {
        outputMessage.textContent = "Veuillez sélectionner un fichier ZIP.";
        outputMessage.style.color = "red";
        return;
    }

    const file = fileInput.files[0];
    const fileName = file.name.replace(".zip", ".mobileconfig");

    // Contenu du profil de configuration
    const profileContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>PayloadType</key>
            <string>com.apple.vpn.managed</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>PayloadIdentifier</key>
            <string>com.example.vpn</string>
            <key>PayloadUUID</key>
            <string>00008030-000145310AD8802E</string>
            <key>PayloadDisplayName</key>
            <string>My VPN</string>
        </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>My Profile</string>
    <key>PayloadIdentifier</key>
    <string>com.example.profile</string>
    <key>PayloadOrganization</key>
    <string>My Organization</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>87654321-4321-8765-4321-876543218765</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;

    // Créer un fichier Blob
    const blob = new Blob([profileContent], { type: "application/x-apple-aspen-config" });

    // Créer un lien de téléchargement
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Ajouter le lien temporairement au DOM et le déclencher
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Afficher un message de succès
    outputMessage.textContent = `Le fichier ${fileName} a été généré avec succès.`;
    outputMessage.style.color = "green";
});