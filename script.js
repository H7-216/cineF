document.getElementById("vpn-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const serverAddress = document.getElementById("server-address").value;
    const outputMessage = document.getElementById("output-message");

    if (!serverAddress) {
        outputMessage.textContent = "Veuillez entrer une adresse de serveur VPN.";
        outputMessage.style.color = "red";
        return;
    }

    // Contenu du profil VPN avec des valeurs par défaut
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
            <string>com.simple.vpn</string>
            <key>PayloadUUID</key>
            <string>00008030-000145310AD8802E</string>
            <key>PayloadDisplayName</key>
            <string>Mon VPN Simplifié</string>
            <key>UserDefinedName</key>
            <string>MonVPN</string>
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
    <string>Profil VPN</string>
    <key>PayloadIdentifier</key>
    <string>com.simple.profile</string>
    <key>PayloadOrganization</key>
    <string>Mon Organisation</string>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>87654321-4321-8765-4321-876543218765</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;

    // Génération du fichier mobileconfig
    const blob = new Blob([profileContent], { type: "application/x-apple-aspen-config" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "profil_vpn.mobileconfig";

    // Simule un clic pour télécharger le fichier
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Afficher un message de succès
    outputMessage.textContent = "Le fichier de configuration VPN a été généré avec succès.";
    outputMessage.style.color = "green";
});