export interface MailBody {
  name: string;
  email: string;
  phoneNumber: string;
  company?: string;
  services?: string[];
  budget: string;
  message: string;
}

export interface MailOptions {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
}

export const mailOptions = (body: MailBody): MailOptions => ({
  from: "FNDRS Info <info@thefndrs.com>",
  to: [
    "carlos.pineda@thefndrs.com",
    "marlon.castro@thefndrs.com",
    "jorge.torres@thefndrs.com",
  ],
  subject: `New inquiry from ${body.name} (${body.email})`,
  text: `
New message from contact form:

Name: ${body.name}
Email: ${body.email}
Phone: ${body.phoneNumber}
Company: ${body.company || "N/A"}
Services: ${body.services?.join(", ") || "N/A"}
Budget: ${body.budget}
Message:
${body.message}
  `,
  html: `
    <div style="font-family: sans-serif; padding: 20px; color: #333; background: #f9f9f9;">
      <h2 style="color: #111;">New contact form submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${
          body.name
        }</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${
          body.email
        }</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${
          body.phoneNumber
        }</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Company:</td><td style="padding: 8px;">${
          body.company || "N/A"
        }</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Services:</td><td style="padding: 8px;">${
          body.services?.join(", ") || "N/A"
        }</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Budget:</td><td style="padding: 8px;">${
          body.budget
        }</td></tr>
      </table>
      <div style="margin-top: 20px;">
        <p style="font-weight: bold; margin-bottom: 5px;">Message:</p>
        <p style="white-space: pre-line;">${body.message}</p>
      </div>
    </div>
  `,
});
