/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  email: string,
  subject: string,
  reactTemplate: any ) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "One Editor<noreply@one-editor.amitprajapati.co.in>",
      to: [email],
      subject: subject,
      react: reactTemplate,
    });

    if (error) {
      return error;
    }

    return data;
  } catch (error) {
    return error;
  }
};
