import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "testotpn16@gmail.com",
        pass: "zyhe vmzp llzh tbhc"
    },
});

async function SendMail(email, otp) {
    try {
        await transport.sendMail({
            to: email,
            subject: 'One time password (OTP)',
            text: `Sizning tasdiqlash kodingiz ${otp}`
        })
    } catch (error) {
        console.log(error);

    }
}

export default SendMail