"use client";

import type { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ProfilePayload } from "@/constants/types";

import { CvUploadField } from "./cv-upload-field";
import { Field } from "./dashboard-field";
import { statusText } from "../lib/helpers";

export function ProfilePanel({
  isUpdating,
  profileForm,
  setProfileForm,
  onSubmit,
}: {
  isUpdating: boolean;
  profileForm: ProfilePayload;
  setProfileForm: Dispatch<SetStateAction<ProfilePayload | null>>;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="grid items-start gap-5 rounded-lg border border-border/50 bg-secondary/25 p-5 xl:grid-cols-2"
    >
      <Field label="Name">
        <Input
          value={profileForm.name}
          onChange={(event) =>
            setProfileForm({ ...profileForm, name: event.target.value })
          }
          required
        />
      </Field>
      <Field label="Headline">
        <Input
          value={profileForm.headline}
          onChange={(event) =>
            setProfileForm({
              ...profileForm,
              headline: event.target.value,
            })
          }
          required
        />
      </Field>
      <Field label="Email">
        <Input
          type="email"
          value={profileForm.email}
          onChange={(event) =>
            setProfileForm({ ...profileForm, email: event.target.value })
          }
          required
        />
      </Field>
      <Field label="Phone">
        <Input
          value={profileForm.phone ?? ""}
          onChange={(event) =>
            setProfileForm({ ...profileForm, phone: event.target.value })
          }
        />
      </Field>
      <Field label="Location">
        <Input
          value={profileForm.location ?? ""}
          onChange={(event) =>
            setProfileForm({
              ...profileForm,
              location: event.target.value,
            })
          }
        />
      </Field>
      <Field label="Availability">
        <Input
          value={profileForm.availability ?? ""}
          onChange={(event) =>
            setProfileForm({
              ...profileForm,
              availability: event.target.value,
            })
          }
        />
      </Field>
      <Field label="GitHub URL">
        <Input
          value={profileForm.github_url ?? ""}
          onChange={(event) =>
            setProfileForm({
              ...profileForm,
              github_url: event.target.value,
            })
          }
        />
      </Field>
      <Field label="LinkedIn URL">
        <Input
          value={profileForm.linkedin_url ?? ""}
          onChange={(event) =>
            setProfileForm({
              ...profileForm,
              linkedin_url: event.target.value,
            })
          }
        />
      </Field>
      <Field label="CV File" className="xl:col-span-2">
        <CvUploadField
          value={profileForm.cv_url ?? ""}
          onChange={(cvUrl) =>
            setProfileForm({ ...profileForm, cv_url: cvUrl })
          }
        />
      </Field>
      <div className="grid gap-3 sm:grid-cols-3 xl:col-span-2">
        <Field label="Years">
          <Input
            type="number"
            value={profileForm.years_experience}
            onChange={(event) =>
              setProfileForm({
                ...profileForm,
                years_experience: Number(event.target.value),
              })
            }
          />
        </Field>
        <Field label="Clients">
          <Input
            type="number"
            value={profileForm.clients_count}
            onChange={(event) =>
              setProfileForm({
                ...profileForm,
                clients_count: Number(event.target.value),
              })
            }
          />
        </Field>
        <Field label="Projects">
          <Input
            type="number"
            value={profileForm.projects_count}
            onChange={(event) =>
              setProfileForm({
                ...profileForm,
                projects_count: Number(event.target.value),
              })
            }
          />
        </Field>
      </div>
      <Field label="Summary" className="xl:col-span-2">
        <Textarea
          rows={4}
          value={profileForm.summary}
          onChange={(event) =>
            setProfileForm({
              ...profileForm,
              summary: event.target.value,
            })
          }
          required
        />
      </Field>
      <Field label="Bio" className="xl:col-span-2">
        <Textarea
          rows={5}
          value={profileForm.bio ?? ""}
          onChange={(event) =>
            setProfileForm({ ...profileForm, bio: event.target.value })
          }
        />
      </Field>
      <div className="xl:col-span-2">
        <Button type="submit" disabled={isUpdating}>
          <Save className="h-4 w-4" />
          {statusText(isUpdating) ?? "Save Profile"}
        </Button>
      </div>
    </form>
  );
}
