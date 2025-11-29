const nodemailer = require("nodemailer");

module.exports = async (email, subject,password,username) => {

    try {

        const transfer = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });

        await transfer.verify();
        
        await transfer.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject, 
       html: `
        <h2>Hello Dr. ${username},</h2>
        <p>Your login credentials are:</p>
        <p><b>username:</b> ${email}</p>
        <p><b>Password:</b> ${password}</p>
        <br>
        <p>Please login and change your password.</p>
      `
        })

    }
    catch (e) {
        console.log("error!!!");
        console.log(e);
    }

}