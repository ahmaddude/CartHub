const BREVO_API_KEY = process.env.BREVO_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'mk4249796@gmail.com';
const FROM_NAME = 'Store';

export const sendMail = async ({ to, subject, html }) => {
  try {
    if (!BREVO_API_KEY) {
      console.error("❌ BREVO_API_KEY is not set in environment");
      return;
    }

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: FROM_NAME, email: FROM_EMAIL },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`❌ Brevo API error (${res.status}):`, err);
      return;
    }

    const body = await res.text();
    console.log("✅ Brevo API success:", body);
  } catch (err) {
    console.error("❌ Email fetch failed:", err.message);
  }
};