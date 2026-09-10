"use client";

import { type SyntheticEvent, useEffect, useMemo, useState } from "react";
import {
  Send,
  Mail,
  MapPin,
  Clock,
  Github,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from "@/constants/axios";
import { endpoints } from "@/constants/endpoints";
import { usePortfolioOverview } from "@/hooks/use-public-portfolio";

type ContactInfoItem = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
};

type SocialLink = {
  icon: LucideIcon;
  label: string;
  href: string;
};

function isPresent<T>(value: T | null): value is T {
  return value !== null;
}

function createInitialFormState(formStartedAt = "") {
  return {
    name: "",
    email: "",
    subject: "",
    budget: "",
    message: "",
    website: "",
    form_started_at: formStartedAt,
  };
}

export default function ContactPage() {
  const { profile } = usePortfolioOverview();
  const [formState, setFormState] = useState(createInitialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const contactInfo = useMemo<ContactInfoItem[]>(
    () =>
      [
        profile?.email
          ? {
              icon: Mail,
              label: "Email",
              value: profile.email,
              href: `mailto:${profile.email}`,
            }
          : null,
        profile?.phone
          ? {
              icon: Phone,
              label: "Phone",
              value: profile.phone,
              href: `tel:${profile.phone.replace(/[^\d+]/g, "")}`,
            }
          : null,
        profile?.location
          ? {
              icon: MapPin,
              label: "Location",
              value: profile.location,
              href: null,
            }
          : null,
        profile?.availability
          ? {
              icon: Clock,
              label: "Availability",
              value: profile.availability,
              href: null,
            }
          : null,
      ].filter(isPresent),
    [profile],
  );
  const socialLinks = useMemo<SocialLink[]>(
    () =>
      [
        profile?.github_url
          ? { icon: Github, label: "GitHub", href: profile.github_url }
          : null,
        profile?.email
          ? { icon: Mail, label: "Email", href: `mailto:${profile.email}` }
          : null,
      ].filter(isPresent),
    [profile],
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setFormState((current) =>
        current.form_started_at
          ? current
          : { ...current, form_started_at: String(Date.now()) },
      );

      if (new URLSearchParams(window.location.search).has("sent")) {
        setSubmitted(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const resetForm = () => {
    setSubmitted(false);
    setIsSending(false);
    setFormState(createInitialFormState(String(Date.now())));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);

    try {
      await axiosInstance.post(endpoints.CONTACT_MESSAGES, {
        ...formState,
        budget: formState.budget || null,
      });

      setSubmitted(true);
      setFormState(createInitialFormState(String(Date.now())));
      toast.success("Message sent. I will get back to you soon.");
    } catch {
      toast.error(
        "I could not send this through the API. Please email me directly for now.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative z-10 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-mono tracking-[0.3em] text-primary uppercase mb-4">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {"Let's Build Something Great"}
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Have a project in mind or just want to say hello? Fill out the form
            below or reach out through any of my channels. I typically respond
            within 24 hours.
          </p>
        </div>

        {contactInfo.length ? (
          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {contactInfo.map((info) => (
            <div
              key={info.label}
              className="group rounded-2xl border border-border/50 bg-secondary/30 p-5 transition-all duration-300 hover:border-primary/30"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <info.icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {info.label}
                </span>
              </div>
              {info.href ? (
                <a
                  href={info.href}
                  className="break-words text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {info.value}
                </a>
              ) : (
                <p className="break-words text-sm font-medium text-foreground">
                  {info.value}
                </p>
              )}
            </div>
            ))}
          </div>
        ) : null}

        <div className="grid items-start gap-6 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="self-start rounded-2xl border border-border/50 bg-secondary/30 p-6 sm:p-8 lg:col-span-3">
            {submitted ? (
              <Card className="border-primary/30 bg-primary/5 shadow-none">
                <CardHeader className="items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-2">
                    <Send className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Message Sent!</CardTitle>
                  <CardDescription className="max-w-sm">
                    {
                      "Thank you for reaching out. I'll get back to you as soon as possible."
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary rounded-full"
                  >
                    Send Another Message
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                <input
                  type="text"
                  name="website"
                  value={formState.website}
                  onChange={(e) =>
                    setFormState({ ...formState, website: e.target.value })
                  }
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <input
                  type="hidden"
                  name="form_started_at"
                  value={formState.form_started_at}
                />
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="Your name"
                      className="h-11 bg-secondary/20 border-border/50 focus-visible:border-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      className="h-11 bg-secondary/20 border-border/50 focus-visible:border-primary/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState({ ...formState, subject: e.target.value })
                      }
                      placeholder="Project type"
                      className="h-11 bg-secondary/20 border-border/50 focus-visible:border-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Input
                      id="budget"
                      name="budget"
                      type="text"
                      value={formState.budget}
                      onChange={(e) =>
                        setFormState({ ...formState, budget: e.target.value })
                      }
                      placeholder="Expected budget"
                      className="h-11 bg-secondary/20 border-border/50 focus-visible:border-primary/50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Tell me about your project..."
                    className="min-h-36 bg-secondary/20 border-border/50 focus-visible:border-primary/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-full sm:w-auto h-11 px-8 rounded-full"
                >
                  {isSending ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="p-6 rounded-2xl border border-border/50 bg-secondary/30">
              <p className="text-xs font-mono tracking-[0.25em] text-primary uppercase mb-3">
                Quick Contact
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {[
                  "Prefer direct communication? Share your brief, timeline, and expected budget range.",
                  profile?.location ? `Current base: ${profile.location}.` : null,
                  profile?.availability ?? null,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </p>
            </div>

            {socialLinks.length ? (
              <div className="p-6 rounded-2xl border border-border/50 bg-secondary/30">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                  Find Me Online
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex items-center justify-center w-11 h-11 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
