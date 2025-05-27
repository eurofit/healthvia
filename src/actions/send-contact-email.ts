'use server';

import { env } from '@/env.mjs';
import { contactFormSchema, ContactFormValues } from '@/zod/contact-form';
import nodemailer from 'nodemailer';

export async function sendContactEmail(formData: ContactFormValues) {
  try {
    // Validate form data
    const validatedData = contactFormSchema.parse(formData);

    // Ensure all fields are trimmed
    const data = {
      name: validatedData.name.trim(),
      email: validatedData.email.trim(),
      subject: validatedData.subject ? validatedData.subject.trim() : '',
      message: validatedData.message.trim(),
    };

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.GMAIL,
        pass: env.GMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: env.GMAIL,
      to: env.GMAIL,
      subject: data.subject || `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: data.email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return { success: true, message: 'Email sent successfully!', name: data.name };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: `Failed to send email. Please try again.`,
    };
  }
}
