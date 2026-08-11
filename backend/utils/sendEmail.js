import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY?.trim());

const sendEmail = async (options) => {
    try {
        const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();

        if (!RESEND_API_KEY) {
            console.log("Missing RESEND_API_KEY in the .env file.");
            throw new Error("Missing email api key");
        }

        const response = await resend.emails.send({
            from: process.env.EMAIL_USER,     // e.g. onboarding@resend.dev or your verified domain
            to: options.email,
            subject: options.subject,
            html: options.message,
        });
        // console.log(response);
        console.log("Email sent successfully via Resend:", response.data?.id);

    } catch (error) {
        console.log("Resend email error:", error);
        throw new Error("Cannot send email via Resend");
    }
};

export default sendEmail;