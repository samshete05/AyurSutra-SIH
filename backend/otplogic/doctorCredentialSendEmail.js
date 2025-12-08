const nodemailer = require("nodemailer");

module.exports = async (email, subject, password, username) => {
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
        <div style="background: #111; padding: 40px 0; font-family: Arial, sans-serif;">
          <div style="
            max-width: 500px; 
            margin: auto; 
            background: #1a1a1a; 
            padding: 30px; 
            border-radius: 12px; 
            color: #e6e6e6;
            box-shadow: 0 0 5px rgba(255,255,255,0.05);
          ">

            <!-- Logo -->
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="cid:appLogo" 
                alt="AyurSutra Logo"
                style="width: 180px; margin-top: 10px;" />
            </div>

            <h2 style="text-align:center; font-weight:500; margin-bottom: 20px;">
              Doctor Login Credentials
            </h2>

            <p style="font-size: 15px; line-height: 1.6;">
              Hello <strong>Dr. ${username}</strong>,
              <br /><br />
              Your account has been successfully created for the <strong>AyurSutra Panchakarma Center Doctor</strong>.
              Below are your secure login credentials:
            </p>

            <!-- Credential Box -->
            <div style="
              margin: 25px 0; 
              padding: 20px; 
              background: #222; 
              border-radius: 10px;
              border: 1px solid #333;
            ">
              <p style="font-size: 16px; margin: 0 0 8px;">
                <strong>Username:</strong> ${email}
              </p>
              <p style="font-size: 16px; margin: 0;">
                <strong>Password:</strong> ${password}
              </p>
            </div>

            <p style="font-size: 15px;">
              Regards,<br />
              <strong>AyurSutra Team</strong>
            </p>

            <div style="text-align:center; margin-top: 25px; font-size: 12px; color: #777;">
              © ${new Date().getFullYear()} AyurSutra. All rights reserved.
            </div>

          </div>
        </div>
      `,

      attachments: [
        {
          filename: "logo.png",
          path: __dirname + "/../logo.png", // adjust path if needed
          cid: "appLogo"
        }
      ]
    });

  } catch (e) {
    console.log("error!!!");
    console.log(e);
  }
};
