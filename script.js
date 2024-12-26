// Conversion ZIP -> APK
document.getElementById("apk-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("apk-file-input");
    const outputMessage = document.getElementById("apk-output-message");

    if (!fileInput.files[0]) {
        outputMessage.textContent = "Veuillez sélectionner un fichier ZIP.";
        outputMessage.style.color = "red";
        return;
    }

    const file = fileInput.files[0];
    const fileName = file.name.replace(".zip", ".apk");

    // Création du fichier APK
    const reader = new FileReader();
    reader.onload = function () {
        const blob = new Blob([reader.result], { type: "application/vnd.android.package-archive" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;

        // Téléchargement du fichier
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        outputMessage.textContent = "Le fichier a été converti en APK.";
        outputMessage.style.color = "green";
    };
    reader.readAsArrayBuffer(file);
});

// Conversion ZIP -> API (fichier mobileconfig)
document.getElementById("api-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const serverAddress = document.getElementById("server-address").value;
    const fileInput = document.getElementById("api-file-input");
    const outputMessage = document.getElementById("api-output-message");

    if (!fileInput.files[0] || !serverAddress) {
        outputMessage.textContent = "Veuillez remplir tous les champs.";
        outputMessage.style.color = "red";
        return;
    }

    const fileName = fileInput.files[0].name.replace(".zip", ".mobileconfig");

    // Contenu du profil mobileconfig
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
            <string>com.api.vpn</string>
            <key>PayloadUUID</key>
            <string>00008030-000145310AD8802E</string>
            <key>PayloadDisplayName</key>
            <string>Mon VPN API</string>
            <key>VPNType</key>
            <string>L2TP</string>
            <key>RemoteAddress</key>
            <string>192.168.1.220</string>
            <key>AuthenticationMethod</key>
            <string>Password</string>
            <key>SharedSecret</key>
            <string>cleSecreteDefaut</string>
            <key>Username</key>
            <string>utilisateurParDefaut</string>
            <key>Password</key>
            <string>motDePasseParDefaut</string>
        </dict>
    </array>
    <key>PayloadDisplayName</key>
    <string>Profil API</string>
    <key>PayloadIdentifier</key>
    <string>com.api.profile</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>87654321-4321-8765-4321-876543218765</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;

    // Création du fichier API
    const blob = new Blob([profileContent], { type: "application/x-apple-aspen-config" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Téléchargement du fichier
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    outputMessage.textContent = "Le fichier a été converti en API (profil mobileconfig).";
    outputMessage.style.color = "green";
});