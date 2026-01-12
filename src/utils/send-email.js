const emailjs = require("emailjs-com");

const sendEmail = async (data) => {
  const { recaptchaToken, ...emailData } = data;

  try {
    // Verify reCAPTCHA via API route
    if (recaptchaToken) {
      const verifyResponse = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: recaptchaToken }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        console.error("reCAPTCHA verification failed:", verifyData);
        throw new Error(verifyData.message || "Verification failed");
      }

      console.log(`reCAPTCHA verified. Score: ${verifyData.score}`);
    }

    // Send the email using EmailJS service
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      emailData,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    return result;
  } catch (error) {
    console.error(
      "Error sending email:",
      error?.text || error.message || error
    );
    throw new Error(error?.text || error.message || "Failed to send email");
  }
};

module.exports = sendEmail;
