/* import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import EmailService from "../service/email.service";

@Controller("email-actions")
export class EmailActionsController {
  constructor(private senderService: EmailService) {}

  @Post("send-welcome")
  @HttpCode(HttpStatus.OK)
  async sendWelcomeEmail(
    @Body() data: { name: string; email: string; confirmationLink: string },
  ) {
    const emailSent = await this.senderService.sendMail({
      to: data.email,
      subject: "Welcome to Our Awesome Service!",
      template: "welcome-email", // Matches the name of your .hbs file
      context: {
        name: data.name,
        confirmationLink: data.confirmationLink,
      },
    });
    if (emailSent) {
      return { message: "Welcome email sent successfully!" };
    } else {
      return {
        message: "Failed to send welcome email.",
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
  @Post("send-invoice")
  @HttpCode(HttpStatus.OK)
  async sendInvoiceEmail(
    @Body() data: { email: string; invoiceNumber: string; amount: string },
  ) {
    const attachmentContent = "This is a simulated invoice PDF content."; // Replace with actual PDF buffer
    const emailSent = await this.senderService.sendEmail({
      to: data.email,
      subject: `Your Invoice #${data.invoiceNumber}`,
      template: "invoice-email",
      context: {
        invoiceNumber: data.invoiceNumber,
        amount: data.amount,
      },
      attachments: [
        {
          filename: `invoice-${data.invoiceNumber}.pdf`,
          content: attachmentContent,
          contentType: "application/pdf",
        },
      ],
    });

    if (emailSent) {
      return { message: "Invoice email sent successfully with attachment!" };
    } else {
      return {
        message: "Failed to send invoice email.",
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
 */
