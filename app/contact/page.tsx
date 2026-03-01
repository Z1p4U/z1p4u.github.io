"use client"

import { useState } from "react"
import { Send, Mail, MapPin, Clock, Github, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "zipshigoto310801@gmail.com",
    href: "mailto:zipshigoto310801@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+95 9791643043 / +66 84 992 0420",
    href: "tel:+66849920420",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangkok, Thailand (Remote)",
    href: null,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Usually within 24 hours",
    href: null,
  },
]

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Z1p4U" },
  { icon: Mail, label: "Email", href: "mailto:zipshigoto310801@gmail.com" },
]

const budgetRanges = [
  { value: "100-300", label: "$100 - $300" },
  { value: "300-700", label: "$300 - $700" },
  { value: "700-1500", label: "$700 - $1,500" },
  { value: "1500-3000", label: "$1,500 - $3,000" },
  { value: "3000+", label: "$3,000+" },
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    budget: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const resetForm = () => {
    setSubmitted(false)
    setFormState({ name: "", email: "", subject: "", budget: "", message: "" })
  }

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
            Have a project in mind or just want to say hello? Fill out the form below or reach out
            through any of my channels. I typically respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-3 p-8 rounded-2xl border border-border/50 bg-secondary/30">
            {submitted ? (
              <Card className="border-primary/30 bg-primary/5 shadow-none">
                <CardHeader className="items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-2">
                    <Send className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">Message Sent!</CardTitle>
                  <CardDescription className="max-w-sm">
                    {"Thank you for reaching out. I'll get back to you as soon as possible."}
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your name"
                      className="h-11 bg-secondary/20 border-border/50 focus-visible:border-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="your@email.com"
                      className="h-11 bg-secondary/20 border-border/50 focus-visible:border-primary/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="subject">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Project type"
                      className="h-11 bg-secondary/20 border-border/50 focus-visible:border-primary/50"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="budget">
                      Budget Range
                    </Label>
                    <Select
                      value={formState.budget || undefined}
                      onValueChange={(value) => setFormState({ ...formState, budget: value })}
                    >
                      <SelectTrigger
                        id="budget"
                        className="w-full h-11 bg-secondary/20 border-border/50 focus-visible:border-primary/50"
                      >
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="min-h-36 bg-secondary/20 border-border/50 focus-visible:border-primary/50 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full sm:w-auto h-11 px-8 rounded-full"
                >
                  Send Message
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
                Prefer direct communication? Share your brief, timeline, and
                expected budget range. I am currently based in Bangkok and
                available for freelance and part-time project work.
              </p>
            </div>

            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="group p-6 rounded-2xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <info.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {info.label}
                  </span>
                </div>
                {info.href ? (
                  <a
                    href={info.href}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-foreground font-medium">{info.value}</p>
                )}
              </div>
            ))}

            {/* Social */}
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
          </div>
        </div>
      </div>
    </section>
  )
}
