const emailjs = require("emailjs-com");

const sendEmail = async (data) => {
  try {
    // Send the email using EmailJS service
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // EmailJS Service ID
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, // EmailJS Template ID
      data, // Data to be included in the email
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // EmailJS Public Key
    );

    return result; // Return the result on success
  } catch (error) {
    console.error(
      "Error sending email:",
      error?.text || error.message || error
    );
    throw new Error(error?.text || error.message || "Failed to send email");
  }
};

module.exports = sendEmail;
