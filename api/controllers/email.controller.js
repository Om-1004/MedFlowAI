import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export const sendEmail = async (req, res) => {
  const ses = new SESClient({ region: process.env.AWS_REGION2 });
  const { name, email, subject, message } = req.body;
  console.log("Form data received:", req.body);
  const params = {
    Source: "medflowai.co@gmail.com", 
    Destination: {
      ToAddresses: ["medflowai.co@gmail.com"], 
    },
    Message: {
      Subject: { Data: `You’ve received a new contact form submission from MedFlowAI User: ${subject}` },
      Body: {
        Text: { Data: `Name: ${name}\nEmail: ${email}\n\n${message}` },
      },
    },
    ReplyToAddresses: [email], 
  };
  try {
    const command = new SendEmailCommand(params);
    const response = await ses.send(command);
    res.json({ message: "Email sent", messageId: response.MessageId });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};