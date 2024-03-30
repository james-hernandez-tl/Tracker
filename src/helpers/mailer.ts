import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODE_MAILER_USER!,
        pass: process.env.NODE_MAILER_PASSWORD!,
      },
    });

    const path = emailType === "VERIFY" ? "verifyemail" : "verifyPasswordReset";
    const subject =
      emailType === "VERIFY" ? "Verify your email" : "Reset your password";

    const url = `${process.env.DOMAIN}/${path}?token=${hashedToken}`;

    const mailOptions = {
      from: "jameshernandez.tl@gmail.com",
      to: email,
      subject,
      html: `<p>Click <a href="${url}">here</a> to ${subject}
            or copy and paste the link below in your browser. <br> ${url}
            </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
