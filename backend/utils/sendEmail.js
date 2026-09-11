import { Resend } from "resend";

const getResendClient = () => {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) return null;
    return new Resend(apiKey);
};

const sendEmail = async (options) => {
    try {
        const resend = getResendClient();
        if (!resend) {
            console.warn("RESEND_API_KEY is not configured in .env. Skipping email sending.");
            throw new Error("Missing email API configuration");
        }

        const from = process.env.EMAIL_USER?.trim() || "onboarding@resend.dev";

        const response = await resend.emails.send({
            from,
            to: options.email,
            subject: options.subject,
            html: options.message,
        });

        if (response.error) {
            console.error("Resend API error:", response.error);
            throw new Error(response.error.message);
        }

        console.log("Email sent successfully via Resend:", response.data?.id);
        return response.data;
    } catch (error) {
        console.error("Resend email error:", error.message);
        throw error;
    }
};

export default sendEmail;