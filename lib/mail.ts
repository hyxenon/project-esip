import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@esip.online",
    to: email,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
        <div style="text-align: center; padding: 20px;">
          <img src="${domain}/images/logo.png" alt="ESIP Logo" style="width: 100px; height: auto;" />
        </div>
        <h2 style="color: #007bff;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the button below to proceed:</p>
        <div style="text-align: center; margin: 20px;">
          <a href="${resetLink}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </div>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p style="font-size: 12px; color: #777;">Thank you, <br/> The ESIP Team</p>
      </div>
    `,
  });
};

export const sendVerificationEmail = async (
  email: string,
  token: string,
  password?: string,
  isAdmin?: boolean
) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@esip.online",
    to: email,
    subject: "Confirm Your Account",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
        <h2 style="color: #007bff;">Welcome to ESIP!</h2>
        <p>Hi there!</p>
        <p>Thank you for creating an account with us. To activate your account, please confirm your email by clicking the button below:</p>
        <div style="text-align: center; margin: 20px;">
          <a href="${confirmLink}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirm Email</a>
        </div>
        <p><strong>Note:</strong> Once you confirm your email, a school teacher will review and approve your account before you can log in.</p>
        ${
          isAdmin
            ? `<p>Your temporary password is: <strong>${password}</strong></p>`
            : ""
        }
        <p>Thank you for joining us, and we look forward to seeing you on ESIP soon!</p>
        <p style="font-size: 12px; color: #777;">Best regards, <br/> The ESIP Team</p>
      </div>
    `,
  });
};
