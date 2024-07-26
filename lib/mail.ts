import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> here to reset your password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string, password?: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> here to confirm email. ${password ? `Password: ${password}` : ""}</p>`,
  });
};
