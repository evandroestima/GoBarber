import IMailProvider from "../Models/IMailProvider";
import nodemailer, { Transporter } from "nodemailer";

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: "eu memo <vandrinpika@gobarber.com",
      to,
      subject: "teste",
      text: "teste",
    });

    console.log("mensagem enviada: %s", message.messageId);
    console.log("url: %s", nodemailer.getTestMessageUrl(message));
  }
}
