'use client';

import { sendContactEmail } from '@/actions/send-contact-email';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contactFormSchema, ContactFormValues } from '@/zod/contact-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, SendHorizonal } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const emailPromise = sendContactEmail(values);

      toast.promise(emailPromise, {
        loading: 'Sending your message...',
        success: (data) => {
          form.reset();
          setIsSubmitting(false);
          return data.message;
        },
        error: (error) => {
          setIsSubmitting(false);
          return error.message;
        },
        description: (data) => {
          if (data instanceof Error) {
            return 'Please check your information and try again.';
          }
          return `Thank you for reaching out, ${data.name}! We will get back to you shortly.`;
        },
        duration: 6000,
      });
    } catch (error) {
      setIsSubmitting(false);
      console.error('Error sending contact email:', error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-md space-y-4 py-6 shadow-sm"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} autoComplete="given-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Subject..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message..." {...field} className="min-h-24" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="group w-full" disabled={isSubmitting}>
          {isSubmitting && (
            <LoaderCircle className="animate-spin" role="status" aria-hidden="true" />
          )}
          {isSubmitting ? 'Sending message...' : 'Send Message'}
          {!isSubmitting && (
            <SendHorizonal
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          )}
        </Button>
      </form>
    </Form>
  );
}
