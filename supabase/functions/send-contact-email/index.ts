import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, service, message }: ContactFormRequest = await req.json();

    console.log("Received contact form submission:", { name, email, phone, subject, service });

    // Send notification email to Faizan
    const notificationEmail = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["faizanali107f@gmail.com"],
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">New Contact Form Submission</h2>
          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Service Interested:</strong> ${service}</p>
          </div>
          <h3>Message:</h3>
          <p style="background: #f4f4f5; padding: 20px; border-radius: 8px;">${message}</p>
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <p style="color: #71717a; font-size: 12px;">This email was sent from your portfolio contact form.</p>
        </div>
      `,
    });

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation email to the sender
    const confirmationEmail = await resend.emails.send({
      from: "Faizan Ali <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Thank You, ${name}!</h2>
          <p>I have received your message and will get back to you as soon as possible.</p>
          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p>${message}</p>
          </div>
          <p>Best regards,<br/><strong>Faizan Ali</strong><br/>WordPress Developer</p>
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <p style="color: #71717a; font-size: 12px;">
            <a href="https://www.linkedin.com/in/faizan-ali-471877243/" style="color: #6366f1;">LinkedIn</a> | 
            <a href="mailto:faizanali107f@gmail.com" style="color: #6366f1;">faizanali107f@gmail.com</a>
          </p>
        </div>
      `,
    });

    console.log("Confirmation email sent:", confirmationEmail);

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
