const BREVO_API_KEY = process.env.BREVO_API_KEY;

export const sendMail = async ({ to, subject, html }) => {
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Store", email: "noreply@store.com" },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }

    console.log("✅ Email sent successfully via Brevo");
  } catch (err) {
    console.error("❌ Email failed:", err.message);
  }
};