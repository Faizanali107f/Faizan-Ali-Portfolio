import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

    // Gmail API credentials
    const GMAIL_CLIENT_ID = Deno.env.get("GMAIL_CLIENT_ID");
    const GMAIL_CLIENT_SECRET = Deno.env.get("GMAIL_CLIENT_SECRET");
    const GMAIL_REFRESH_TOKEN = Deno.env.get("GMAIL_REFRESH_TOKEN");
    const DESTINATION_EMAIL = Deno.env.get("DESTINATION_EMAIL") || "faizanali107f@gmail.com";

    if (!GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !GMAIL_REFRESH_TOKEN) {
      console.error("Missing Gmail API credentials");
      return new Response(
        JSON.stringify({
          error: "Email service not configured. Please contact the administrator.",
          details: "GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, or GMAIL_REFRESH_TOKEN not set"
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get fresh access token using refresh token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: GMAIL_CLIENT_ID,
        client_secret: GMAIL_CLIENT_SECRET,
        refresh_token: GMAIL_REFRESH_TOKEN,
        grant_type: "refresh_token",
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Failed to get access token:", errorData);
      throw new Error("Failed to get Gmail access token");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Create email message
    const emailSubject = `🚀 New Inquiry: ${safeSubject}`;
    const emailHtml = `
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
      <p style="color: #52525b; font-size: 12px; margin: 4px 0 0;">Sent at: ${new Date().toLocaleString()}</p>
    </div>
  </div>
</body>
</html>
`;

    // Encode message for Gmail API
    const emailContent = [
      `To: ${DESTINATION_EMAIL}`,
      `Subject: =?UTF-8?B?${btoa(emailSubject)}?=`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=UTF-8",
      "",
      emailHtml
    ].join("\r\n");

    const encodedEmail = btoa(unescape(encodeURIComponent(emailContent)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send email using Gmail API
    const gmailResponse = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/send`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raw: encodedEmail,
        }),
      }
    );

    if (!gmailResponse.ok) {
      const gmailError = await gmailResponse.text();
      console.error("Gmail API error:", gmailError);
      throw new Error(`Gmail API error: ${gmailError}`);
    }

    const gmailData = await gmailResponse.json();
    console.log("Email sent successfully via Gmail:", gmailData);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully!",
        messageId: gmailData.id
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email-gmail function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to send email",
        details: "Please check your Gmail API configuration"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
