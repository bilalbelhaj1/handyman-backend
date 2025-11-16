const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_ADMIN,
        pass:process.env.EMAIL_PASS
    }
})

async function sendEmail(to, subject, text, html){
    try{
        await transporter.sendMail({
            from:process.env.EMAIL_ADMIN,
            to,
            subject,
            text,
            html
        })
        
        return {success:'True'};
    }catch(err){
        console.error("Email sending error"+err);
        return {success:'false',error:err};
    }
}

module.exports = {transporter, sendEmail};