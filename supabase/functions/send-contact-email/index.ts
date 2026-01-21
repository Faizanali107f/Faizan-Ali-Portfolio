import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limiting - in-memory store (resets on cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // Max 3 submissions
const RATE_WINDOW = 15 * 60 * 1000; // 15 minutes

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT) {
    return true;
  }

  record.count++;
  return false;
}

// Input validation
function validateInput(data: any): { valid: boolean; error?: string } {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2 || data.name.length > 100) {
    return { valid: false, error: 'Invalid name' };
  }
  if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 255) {
    return { valid: false, error: 'Invalid email' };
  }
  if (!data.phone || typeof data.phone !== 'string' || data.phone.length < 10 || data.phone.length > 20) {
    return { valid: false, error: 'Invalid phone' };
  }
  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length < 3 || data.subject.length > 200) {
    return { valid: false, error: 'Invalid subject' };
  }
  if (data.message && (typeof data.message !== 'string' || data.message.length > 2000)) {
    return { valid: false, error: 'Message too long' };
  }
  return { valid: true };
}

// Sanitize HTML content
function sanitize(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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
    const body = await req.json();
    
    // Validate input
    const validation = validateInput(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, phone, subject, service, message }: ContactFormRequest = body;

    // Rate limiting by email
    if (isRateLimited(email.toLowerCase())) {
      console.log("Rate limited:", email);
      return new Response(
        JSON.stringify({ error: "rate_limit", message: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize all inputs for email HTML
    const safeName = sanitize(name);
    const safeEmail = sanitize(email);
    const safePhone = sanitize(phone);
    const safeSubject = sanitize(subject);
    const safeService = sanitize(service || 'Not specified');
    const safeMessage = sanitize(message || 'No message provided');

    console.log("Processing contact form submission:", { name: safeName, email: safeEmail });

    // Send notification email to Faizan
    const notificationEmail = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["faizanali107f@gmail.com"],
      subject: `🚀 New Inquiry: ${safeSubject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0b; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <div style="display: inline-block; background: linear-gradient(135deg, #ec4899, #8b5cf6); padding: 16px 32px; border-radius: 16px;">
                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">New Contact Request</h1>
              </div>
            </div>
            
            <!-- Main Card -->
            <div style="background: linear-gradient(145deg, #18181b, #1f1f23); border: 1px solid #27272a; border-radius: 20px; padding: 32px; margin-bottom: 24px;">
              <!-- Contact Info Grid -->
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #27272a;">
                    <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Name</span>
                    <p style="margin: 4px 0 0; color: #fafafa; font-size: 16px; font-weight: 600;">${safeName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #27272a;">
                    <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</span>
                    <p style="margin: 4px 0 0;"><a href="mailto:${safeEmail}" style="color: #ec4899; font-size: 16px; text-decoration: none;">${safeEmail}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #27272a;">
                    <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</span>
                    <p style="margin: 4px 0 0;"><a href="tel:${safePhone}" style="color: #ec4899; font-size: 16px; text-decoration: none;">${safePhone}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #27272a;">
                    <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</span>
                    <p style="margin: 4px 0 0; color: #fafafa; font-size: 16px;">${safeSubject}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service Interested</span>
                    <p style="margin: 4px 0 0;"><span style="display: inline-block; background: linear-gradient(135deg, #ec4899, #8b5cf6); color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 14px; font-weight: 500;">${safeService}</span></p>
                  </td>
                </tr>
              </table>
            </div>
            
            <!-- Message Card -->
            <div style="background: linear-gradient(145deg, #18181b, #1f1f23); border: 1px solid #27272a; border-radius: 20px; padding: 32px;">
              <h3 style="margin: 0 0 16px; color: #fafafa; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
              <p style="margin: 0; color: #a1a1aa; font-size: 16px; line-height: 1.8;">${safeMessage}</p>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #27272a;">
              <p style="color: #52525b; font-size: 12px; margin: 0;">This email was sent from your portfolio contact form</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Notification email sent:", notificationEmail);

    // Send confirmation email to the sender
    const confirmationEmail = await resend.emails.send({
      from: "Faizan Ali <onboarding@resend.dev>",
      to: [email],
      subject: "✨ Thanks for reaching out!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0b; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <!-- Header with Gradient -->
            <div style="text-align: center; margin-bottom: 40px;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #ec4899, #8b5cf6); border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 40px;">👋</span>
              </div>
              <h1 style="margin: 0 0 8px; color: #fafafa; font-size: 32px; font-weight: 700;">Hey ${safeName}!</h1>
              <p style="margin: 0; color: #a1a1aa; font-size: 18px;">Thanks for getting in touch</p>
            </div>
            
            <!-- Main Content Card -->
            <div style="background: linear-gradient(145deg, #18181b, #1f1f23); border: 1px solid #27272a; border-radius: 20px; padding: 32px; margin-bottom: 24px;">
              <p style="margin: 0 0 20px; color: #e4e4e7; font-size: 16px; line-height: 1.8;">
                I've received your message and I'm excited to learn more about your project! I typically respond within <strong style="color: #ec4899;">24-48 hours</strong>.
              </p>
              
              <!-- Message Summary -->
              <div style="background: #0a0a0b; border: 1px solid #27272a; border-radius: 12px; padding: 20px; margin-top: 24px;">
                <h3 style="margin: 0 0 12px; color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Message</h3>
                <p style="margin: 0 0 8px; color: #fafafa; font-size: 16px; font-weight: 600;">${safeSubject}</p>
                <p style="margin: 0; color: #a1a1aa; font-size: 14px; line-height: 1.6;">${safeMessage}</p>
              </div>
            </div>
            
            <!-- About Me Card -->
            <div style="background: linear-gradient(145deg, #18181b, #1f1f23); border: 1px solid #27272a; border-radius: 20px; padding: 32px; text-align: center;">
              <h3 style="margin: 0 0 16px; color: #fafafa; font-size: 18px;">While you wait...</h3>
              <p style="margin: 0 0 24px; color: #a1a1aa; font-size: 14px; line-height: 1.6;">
                Feel free to check out my portfolio and see some of the projects I've worked on!
              </p>
              <a href="https://faizan-ali.lovable.app" style="display: inline-block; background: linear-gradient(135deg, #ec4899, #8b5cf6); color: #ffffff; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px;">View My Portfolio</a>
            </div>
            
            <!-- Signature -->
            <div style="margin-top: 40px; padding: 32px; text-align: center;">
              <p style="margin: 0 0 8px; color: #fafafa; font-size: 18px; font-weight: 600;">Best regards,</p>
              <p style="margin: 0 0 4px; background: linear-gradient(135deg, #ec4899, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 24px; font-weight: 700;">Faizan Ali</p>
              <p style="margin: 0 0 24px; color: #71717a; font-size: 14px;">WordPress Developer | 3.5+ Years Experience</p>
              
              <!-- Social Links -->
              <div style="display: flex; justify-content: center; gap: 16px;">
                <a href="https://www.linkedin.com/in/faizan-ali-471877243/" style="display: inline-block; width: 40px; height: 40px; background: #27272a; border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #ec4899;">in</a>
                <a href="mailto:faizanali107f@gmail.com" style="display: inline-block; width: 40px; height: 40px; background: #27272a; border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #ec4899;">✉</a>
                <a href="https://www.instagram.com/its_faizan412/" style="display: inline-block; width: 40px; height: 40px; background: #27272a; border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #ec4899;">📷</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 24px; padding-top: 24px; border-top: 1px solid #27272a;">
              <p style="color: #52525b; font-size: 12px; margin: 0;">© 2024 Faizan Ali. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
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
