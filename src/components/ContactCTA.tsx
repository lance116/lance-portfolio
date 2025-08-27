"use client";

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Send, Linkedin, Check, CircleCheckBig, IdCard } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string; // Anti-spam field
}

interface ContactCTAProps {
  className?: string;
}

export default function ContactCTA({ className }: ContactCTAProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmit, setLastSubmit] = useState(0);

  const form = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      honeypot: '',
    },
  });

  const onSubmit = useCallback(async (data: ContactFormData) => {
    // Basic rate limiting
    const now = Date.now();
    if (now - lastSubmit < 5000) {
      toast.error('Please wait a moment before submitting again');
      return;
    }

    // Check honeypot
    if (data.honeypot) {
      toast.error('Invalid submission detected');
      return;
    }

    setIsSubmitting(true);
    setLastSubmit(now);

    try {
      // Formspree endpoint for contact form
      const response = await fetch('https://formspree.io/f/mzzabynn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (response.ok) {
        toast.success('Message sent successfully! I\'ll get back to you soon.');
        setIsSubmitted(true);
        form.reset(); // Clear the form
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  }, [lastSubmit, form]);

  const handleDownloadResume = useCallback(() => {
    // In a real app, this would trigger a resume download
    toast.success('Resume download started');
  }, []);

  const handleSocialClick = useCallback((platform: string) => {
    // In a real app, these would navigate to actual social profiles
    toast.info(`Opening ${platform} profile`);
  }, []);

  if (isSubmitted) {
    return (
      <section className={`w-full py-16 px-6 ${className}`}>
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                <CircleCheckBig className="w-8 h-8 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-heading font-semibold text-foreground">
                  Message Sent Successfully!
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Thanks for reaching out! I'll review your message and get back to you within 24 hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleDownloadResume}
                  variant="outline"
                  className="inline-flex items-center gap-2 hover:border-primary hover:text-primary transition-colors"
                >
                  <IdCard className="w-4 h-4" />
                  Download Resume
                </Button>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Send Another Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full pt-6 pb-16 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - CTA Content */}
            <div className="p-8 lg:p-12 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-heading font-bold text-black leading-tight">
                  Let's build something <span className="text-primary">great</span> — get in touch today!
                </h2>
                <p className="text-muted-foreground text-lg">
                  Ready to discuss opportunities or collaborate on your next project? 
                  I'm currently available for new challenges.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    Connect with me
                  </h3>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                      onClick={() => handleSocialClick('Email')}
                      aria-label="Send email"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                      onClick={() => handleSocialClick('LinkedIn')}
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleDownloadResume}
                    variant="outline"
                    size="sm"
                    className="inline-flex items-center gap-2 hover:border-primary hover:text-primary transition-colors"
                  >
                    <IdCard className="w-4 h-4" />
                    Download Resume
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Available for immediate opportunities
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="p-8 lg:p-12 bg-muted/30">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{
                        required: 'Name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">
                            Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your full name"
                              className="bg-card border-input focus:border-ring focus:ring-ring"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">
                            Email *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="your.email@example.com"
                              className="bg-card border-input focus:border-ring focus:ring-ring"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="What's this about?"
                              className="bg-card border-input focus:border-ring focus:ring-ring"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      rules={{
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Message must be at least 10 characters' }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">
                            Message *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell me about your project or opportunity..."
                              rows={4}
                              className="bg-card border-input focus:border-ring focus:ring-ring resize-none"
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Honeypot field - hidden from users */}
                    <FormField
                      control={form.control}
                      name="honeypot"
                      render={({ field }) => (
                        <FormItem className="hidden">
                          <FormControl>
                            <Input
                              {...field}
                              tabIndex={-1}
                              autoComplete="off"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 transition-colors duration-200"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Your information is secure and will never be shared.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2024 Lance Yan. Built with Next.js and passion.
          </p>
        </div>
      </div>
    </section>
  );
}