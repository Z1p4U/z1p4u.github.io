import type { Metadata } from "next"
import { Briefcase, Code2, Heart, Smartphone } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Thant Zin Htet",
  description:
    "Learn more about Thant Zin Htet - full-stack web developer experienced in React, Next.js, React Native, Laravel, and Node.js.",
}

const timeline = [
  {
    year: "Jan 2026 - Present",
    title: "Full-Stack Web Developer · Ravus Law Firm",
    description:
      "Working on internal and client-facing web systems while maintaining production-grade code quality and delivery.",
    icon: Briefcase,
  },
  {
    year: "2023 - Present",
    title: "Freelance Full-Stack & Mobile Developer",
    description:
      "Delivering web and mobile projects for clients using React/Next.js, React Native, Laravel, and Node.js.",
    icon: Smartphone,
  },
  {
    year: "Netscriper Co., Ltd.",
    title: "Full-Stack Web Developer",
    description:
      "Built React + Laravel applications, REST APIs, WordPress CMS solutions with ACF, and handled deployment on cPanel and DigitalOcean VPS.",
    icon: Briefcase,
  },
  {
    year: "Yolo Digital Myanmar",
    title: "Full-Stack Web Developer",
    description:
      "Developed production web features and CMS-driven websites while collaborating in team delivery cycles.",
    icon: Code2,
  },
]

const values = [
  {
    title: "Clean, Maintainable Code",
    description:
      "I focus on readable, scalable code structure and practical architecture decisions.",
  },
  {
    title: "Product-Focused Delivery",
    description:
      "I prioritize user outcomes and business goals, not just technical implementation.",
  },
  {
    title: "Clear Communication",
    description:
      "I keep project updates transparent with realistic timelines and clear expectations.",
  },
  {
    title: "Continuous Improvement",
    description:
      "I actively improve workflows and keep up with modern JavaScript and backend tooling.",
  },
]

const highlights = [
  {
    label: "Experience",
    value: "3+ Years",
    detail: "Full-stack web and mobile delivery",
  },
  {
    label: "Projects",
    value: "30+",
    detail: "Client projects completed",
  },
  {
    label: "Clients",
    value: "20+",
    detail: "Across agency and freelance work",
  },
  {
    label: "Availability",
    value: "Remote",
    detail: "Based in Bangkok, Thailand",
  },
]

export default function AboutPage() {
  return (
    <div className="relative z-10 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-mono tracking-[0.3em] text-primary uppercase mb-4">
            About Me
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {"I'm "}
            <span className="text-primary">Thant Zin Htet</span>
            {", a Full-Stack Web Developer"}
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            I build e-commerce platforms, POS systems, custom CMS websites, and
            mobile apps with a focus on clean code and reliable product
            delivery. I am currently working at Ravus Law Firm (since January
            2026) and available for freelance and part-time projects.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="p-5 rounded-2xl border border-border/50 bg-secondary/30"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {item.label}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {item.value}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6 mb-24">
          <div className="lg:col-span-3 p-8 rounded-2xl border border-border/50 bg-secondary/30">
            <h2 className="text-2xl font-bold text-foreground mb-6">Professional Summary</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                I am currently working as a Full-Stack Web Developer at Ravus
                Law Firm, while continuing selected freelance and part-time
                engagements.
              </p>
              <p>
                My primary stack includes React, Next.js, React Native, Laravel,
                and Node.js. I have built full-stack solutions across web and
                mobile, including storefronts, POS tools, and CMS-based
                platforms.
              </p>
              <p>
                In previous roles at Netscriper Co., Ltd. and Yolo Digital
                Myanmar, I delivered production features, API integrations, and
                custom WordPress builds with ACF while managing deployments and
                server setup workflows.
              </p>
              <p>
                I enjoy working with product-driven teams, writing maintainable
                code, and shipping user-friendly applications that can evolve
                over time.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            {timeline.map((item) => (
              <div
                key={`${item.year}-${item.title}`}
                className="group p-6 rounded-2xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-primary mb-1">{item.year}</p>
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-8">
            <Heart className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">How I Work</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-7 rounded-2xl border border-border/50 bg-secondary/30 hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
