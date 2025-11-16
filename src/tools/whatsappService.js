const client = require('./whatsappClient'); // <-- importer le client existant

function formatPhoneNumber(phone) {
    phone = phone.replace(/\D/g, "");
    if (phone.startsWith("0")) {
        phone = "212" + phone.substring(1);
    }
    return phone;
}

async function sendPasswordToUser(phoneNumber, password) {
    try {
        const cleanPhone = formatPhoneNumber(phoneNumber);

        // Vérifie si le numéro existe sur WhatsApp
        const numberId = await client.getNumberId(cleanPhone);

        if (!numberId) {
            console.log("❌ Ce numéro n'est pas WhatsApp :", cleanPhone);
            return;
        }

        // Envoi
        await client.sendMessage(numberId._serialized, `Votre mot de passe est : ${password}`);

        console.log("✅ Mot de passe envoyé !");
    } catch (err) {
        console.error("Password doesn't send", err);
    }
}

module.exports = sendPasswordToUser;
