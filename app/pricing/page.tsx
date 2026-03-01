import type { Metadata } from "next"
import { Check, ArrowRight, MessageCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Pricing | Thant Zin Htet",
  description: "Transparent pricing for web development services. From simple websites to full-scale applications.",
}

const plans = [
  {
    name: "Starter",
    price: "$500",
    period: "per project",
    description: "Perfect for small businesses and personal projects that need a professional online presence.",
    features: [
      "Single page website or landing page",
      "Fully responsive design",
      "Basic SEO optimization",
      "Contact form integration",
      "Social media links",
      "1 revision round",
      "Source code delivery",
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "$1,500",
    period: "per project",
    description: "For growing businesses that need a feature-rich website with backend functionality.",
    features: [
      "Multi-page website (up to 5 pages)",
      "CMS integration (WordPress or custom)",
      "Advanced SEO & analytics",
      "Payment gateway integration",
      "Admin dashboard",
      "3 revision rounds",
      "30 days post-launch support",
      "Performance optimization",
    ],
    popular: true,
    cta: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "project based",
    description: "Full-scale custom applications, POS systems, or ecommerce platforms tailored to your needs.",
    features: [
      "Custom web or mobile application",
      "Full admin dashboard & CMS",
      "API development & integration",
      "Database architecture & design",
      "Authentication & authorization",
      "Unlimited revision rounds",
      "Ongoing maintenance & support",
      "Performance & security audit",
      "Deployment & DevOps setup",
    ],
    cta: "Contact Me",
  },
]

const addons = [
  { name: "Additional page", price: "$150" },
  { name: "Blog system setup", price: "$300" },
  { name: "E-commerce (WooCommerce)", price: "$500" },
  { name: "Custom API integration", price: "$400" },
  { name: "Mobile app (React Native)", price: "From $2,000" },
  { name: "Monthly maintenance", price: "$200/mo" },
]

export default function PricingPage() {
  return (
    <div className="relative z-10 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-mono tracking-[0.3em] text-primary uppercase mb-4">
            Pricing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Transparent & Flexible Pricing
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            {
              "Every project is unique. These packages serve as starting points — I'll work with you to create a custom plan that fits your exact needs and budget."
            }
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/50 bg-secondary/30 hover:border-primary/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-mono rounded-full bg-primary text-primary-foreground">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{plan.description}</p>

              <ul className="mt-8 flex flex-col gap-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`mt-8 flex items-center justify-center gap-2 w-full py-3 rounded-full font-medium text-sm transition-colors ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Add-ons & Extras</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addons.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-secondary/30"
              >
                <span className="text-sm text-foreground">{addon.name}</span>
                <span className="text-sm font-mono text-primary font-bold">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ / CTA */}
        <div className="text-center p-12 rounded-3xl border border-primary/20 bg-primary/5">
          <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3 text-balance">
            Not Sure Which Plan Fits?
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
            {
              "Let's have a quick chat about your project. I'll recommend the best approach and give you an accurate quote — no obligations."
            }
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            {"Let's Talk"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
