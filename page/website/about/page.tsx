import type { Metadata } from "next";
import { Briefcase, Code2, MapPin, Smartphone } from "lucide-react";

import type { PortfolioSkill } from "@/constants/types";
import {
  getFirstProfile,
  listPublishedExperiences,
  listPublishedSkills,
} from "@/lib/server/db-queries";
import {
  mapExperience,
  mapProfile,
  mapSkill,
} from "@/lib/server/portfolio";

export const metadata: Metadata = {
  title: "About",
  description: "Portfolio profile, experience, and skills.",
};

function groupSkillsByCategory(skills: PortfolioSkill[]) {
  return Array.from(
    skills
      .reduce((groups, skill) => {
        const group = groups.get(skill.category) ?? [];
        group.push(skill);
        groups.set(skill.category, group);
        return groups;
      }, new Map<string, PortfolioSkill[]>())
      .entries(),
  );
}

export default async function AboutPage() {
  const [profileRecord, experienceRecords, skillRecords] = await Promise.all([
    getFirstProfile(),
    listPublishedExperiences(),
    listPublishedSkills(),
  ]);
  const profile = profileRecord ? mapProfile(profileRecord) : null;
  const experiences = experienceRecords.map(mapExperience);
  const skillGroups = groupSkillsByCategory(skillRecords.map(mapSkill));

  if (!profile) {
    return (
      <div className="relative z-10 px-6 pb-24 pt-32">
        <div className="mx-auto max-w-6xl rounded-2xl border border-border/50 bg-secondary/25 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            No profile content has been published yet.
          </p>
        </div>
      </div>
    );
  }

  const highlights = [
    {
      label: "Experience",
      value: `${profile.stats.years_experience}+`,
      detail: "Years",
    },
    {
      label: "Projects",
      value: `${profile.stats.projects_count}+`,
      detail: "Published work",
    },
    {
      label: "Clients",
      value: `${profile.stats.clients_count}+`,
      detail: "Collaborations",
    },
    profile.location
      ? {
          label: "Location",
          value: profile.location,
          detail: "Current base",
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="relative z-10 px-6 pb-24 pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-4 text-sm font-mono uppercase tracking-[0.3em] text-primary">
            About
          </p>
          <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
            {profile.name}
          </h1>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {profile.bio ?? profile.summary}
          </p>
        </div>

        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) =>
            item ? (
              <div
                key={item.label}
                className="rounded-2xl border border-border/50 bg-secondary/30 p-5"
              >
                <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="mb-1 text-2xl font-bold text-primary md:text-3xl">
                  {item.value}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            ) : null,
          )}
        </div>

        <div className="mb-24 grid gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-border/50 bg-secondary/30 p-8 lg:col-span-3">
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Professional Summary
            </h2>
            <div className="space-y-5 leading-relaxed text-muted-foreground">
              <p>{profile.summary}</p>
              {profile.bio && profile.bio !== profile.summary ? (
                <p>{profile.bio}</p>
              ) : null}
              {profile.availability ? <p>{profile.availability}</p> : null}
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-2">
            {experiences.length ? (
              experiences.map((item, index) => {
                const ExperienceIcon =
                  index % 3 === 1
                    ? Smartphone
                    : index % 3 === 2
                      ? Code2
                      : Briefcase;

                return (
                  <div
                    key={`${item.period}-${item.title}`}
                    className="group rounded-2xl border border-border/50 bg-secondary/30 p-6 transition-all duration-300 hover:border-primary/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <ExperienceIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-mono text-primary">
                          {item.period}
                        </p>
                        <h3 className="text-base font-semibold text-foreground">
                          {item.title}
                        </h3>
                        {item.company ? (
                          <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" />
                            {item.company}
                          </p>
                        ) : null}
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-2xl border border-border/50 bg-secondary/30 p-6 text-sm text-muted-foreground">
                No experience entries have been published yet.
              </div>
            )}
          </div>
        </div>

        {skillGroups.length ? (
          <div>
            <div className="mb-8 flex items-center gap-3">
              <Code2 className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">Skills</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {skillGroups.map(([category, skills]) => (
                <div
                  key={category}
                  className="rounded-2xl border border-border/50 bg-secondary/30 p-7 transition-all duration-300 hover:border-primary/30"
                >
                  <h3 className="mb-4 text-lg font-bold text-foreground">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="rounded-full border border-border/40 bg-muted px-3 py-1 text-xs font-mono text-muted-foreground"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
