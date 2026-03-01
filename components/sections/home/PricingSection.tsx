import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$500",
    suffix: "project",
    description: "Small businesses & personal projects",
    features: [
      "Single page website",
      "Responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "1 revision round",
    ],
  },
  {
    name: "Professional",
    price: "$1,500",
    suffix: "project",
    description: "Growing businesses needing more",
    features: [
      "Multi-page website (up to 5)",
      "CMS integration",
      "Advanced SEO optimization",
      "Payment integration",
      "3 revision rounds",
      "30 days post-launch support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    suffix: "quote",
    description: "Full-scale apps & complex systems",
    features: [
      "Custom web/mobile application",
      "Admin dashboard & API",
      "Database architecture",
      "Third-party integrations",
      "Unlimited revisions",
      "Ongoing support & maintenance",
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative z-10 py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">
            Pricing
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
            {"Transparent pricing,"}
            <br />
            {"no surprises."}
          </h2>
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
          >
            View full pricing
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border/30 rounded-xl overflow-hidden">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-background p-8 md:p-10 flex flex-col ${
                plan.popular ? "bg-secondary/20" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute top-6 right-6 px-3 py-1 text-[10px] font-mono tracking-wider uppercase rounded bg-primary/10 text-primary border border-primary/20">
                  Popular
                </span>
              )}

              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {plan.name}
              </span>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  /{plan.suffix}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {plan.description}
              </p>

              <ul className="mt-8 flex flex-col gap-3 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`mt-8 flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium text-sm transition-all ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-border text-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
