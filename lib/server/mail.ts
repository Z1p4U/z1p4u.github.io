import nodemailer from "nodemailer";

import type { DbContactMessage } from "@/lib/server/db-queries";

export async function sendContactNotification(message: DbContactMessage) {
  const host = process.env.MAIL_HOST;
  const user = process.env.MAIL_USER;
  const password = process.env.MAIL_PASSWORD;
  const to = process.env.PORTFOLIO_CONTACT_TO;

  if (!host || !user || !password || !to) {
    return { sent: false, reason: "missing_config" as const };
  }

  const port = Number(process.env.MAIL_PORT ?? 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass: password,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM ?? user,
    to,
    subject: `New portfolio request: ${message.subject}`,
    text: [
      "A new contact request was saved in your portfolio panel.",
      "",
      `Subject: ${message.subject}`,
      `Submitted at: ${message.createdAt}`,
      "",
      "Open the panel to review the sender details and full message.",
    ].join("\n"),
  });

  return { sent: true, reason: null };
}
