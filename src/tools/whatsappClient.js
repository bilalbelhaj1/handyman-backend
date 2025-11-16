const {Client, LocalAuth} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy:new LocalAuth(),
    puppeteer:{
        headless:false,
        args:['--no-sandox','--disable-setuid-sandbox']
    }
});

// Convertir automatiquement le numéro de téléphone
function formatPhoneNumber(phone) {
    // Enlever espaces et caractères non numériques
    phone = phone.replace(/\D/g, "");

    // Si commence par 0 → remplacer par 212
    if (phone.startsWith("0")) {
        phone = "212" + phone.substring(1);
    }

    return `${phone}@c.us`;
}

client.on('qr',(qr) => {
    console.log('(Scan ce QR code avec ton WhatsApp : ');
    qrcode.generate(qr,{small:true});
});

client.on('ready', () => {
    console.log("Whatsapp Web connected and ready");
});

client.initialize();

module.exports = client;