"use client";

import {
  Code2,
  Smartphone,
  Server,
  ShoppingCart,
  Database,
  Globe,
} from "lucide-react";
import { useMemo } from "react";
import type { PortfolioSkill } from "@/constants/types";
import { usePortfolioOverview } from "@/hooks/use-public-portfolio";

const categoryIcons = [Code2, Server, Smartphone, ShoppingCart, Database, Globe];

function getCategoryIcon(category: string, index: number) {
  const label = category.toLowerCase();
  if (label.includes("frontend")) return Code2;
  if (label.includes("backend")) return Server;
  if (label.includes("mobile")) return Smartphone;
  if (label.includes("commerce")) return ShoppingCart;
  if (label.includes("database") || label.includes("devops")) return Database;
  if (label.includes("cms") || label.includes("wordpress")) return Globe;
  return categoryIcons[index % categoryIcons.length];
}

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

export function SkillsSection() {
  const { skills } = usePortfolioOverview();
  const skillGroups = useMemo(() => groupSkillsByCategory(skills), [skills]);

  if (!skillGroups.length) return null;

  return (
    <section id="skills" className="relative z-10 py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs font-mono tracking-[0.3em] text-primary uppercase">
            Skills
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-16 text-balance">
          {"My Tech Stack"}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map(([category, categorySkills], index) => {
            const CategoryIcon = getCategoryIcon(category, index);

            return (
            <div
              key={category}
              className="group relative rounded-2xl border border-border/40 bg-secondary/20 p-7 transition-all duration-300 hover:border-primary/20 hover:bg-secondary/25"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary/15 transition-colors">
                <CategoryIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 transition-colors group-hover:text-foreground">
                {category}
              </h3>
              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <span className="text-sm text-foreground">{skill.name}</span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
